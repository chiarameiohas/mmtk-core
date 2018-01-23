use ::vm::Scanning;
use ::plan::{TransitiveClosure, TraceLocal};
use ::util::{ObjectReference, Address, SynchronizedCounter};
use ::vm::jikesrvm::jtoc::*;
use super::JTOC_BASE;
use super::unboxed_size_constants::LOG_BYTES_IN_ADDRESS;
use super::super::VMObjectModel;
use super::super::ObjectModel;
use std::mem::size_of;
use std::slice;

static COUNTER: SynchronizedCounter = SynchronizedCounter::new(0);

pub struct VMScanning {}

impl Scanning for VMScanning {
    fn scan_object<T: TransitiveClosure>(trace: &mut T, object: ObjectReference, thread_id: usize) {
        debug!("jtoc_call");
        let elt0_ptr: usize = jtoc_call!(GET_OFFSET_ARRAY_METHOD_JTOC_OFFSET, thread_id, object);
        debug!("elt0_ptr: {}", elt0_ptr);
        if elt0_ptr == 0 {
            // object is a REFARRAY
            let length = VMObjectModel::get_array_length(object);
            for i in 0..length {
                trace.process_edge(object.to_address() + (i << LOG_BYTES_IN_ADDRESS));
            }
        } else {
            let len_ptr: usize = elt0_ptr - size_of::<isize>();
            let len = unsafe { *(len_ptr as *const isize) };
            let offsets = unsafe { slice::from_raw_parts(elt0_ptr as *const isize, len as usize) };

            for offset in offsets.iter() {
                trace.process_edge(object.to_address() + *offset);
            }
        }
    }

    fn reset_thread_counter() {
        unimplemented!()
    }

    fn notify_initial_thread_scan_complete(partial_scan: bool) {
        unimplemented!()
    }

    fn compute_static_roots<T: TraceLocal>(trace: &mut T) {
        unimplemented!()
    }

    fn compute_global_roots<T: TraceLocal>(trace: &mut T) {
        unimplemented!()
    }

    fn compute_thread_roots<T: TraceLocal>(trace: &mut T, thread_id: usize) {
        Self::compute_thread_roots(trace, false, thread_id)
    }

    fn compute_new_thread_roots<T: TraceLocal>(trace: &mut T, thread_id: usize) {
        Self::compute_thread_roots(trace, true, thread_id)
    }

    fn compute_bootimage_roots<T: TraceLocal>(trace: &mut T) {
        unimplemented!()
    }

    fn supports_return_barrier() -> bool {
        unimplemented!()
    }
}

impl VMScanning {
    fn compute_thread_roots<T: TraceLocal>(trace: &mut T, new_roots_sufficient: bool, thread_id: usize) {
        unsafe {
            let process_code_locations =
                (JTOC_BASE + MOVES_CODE_FIELD_JTOC_OFFSET).load::<bool>();

            let num_threads =
                (JTOC_BASE + NUM_THREADS_FIELD_JTOC_OFFSET).load::<usize>();

            loop {
                let thread_index = COUNTER.increment();
                if thread_index > num_threads {
                    break;
                }

                let thread =
                    Address::from_usize(
                        Address::from_usize((JTOC_BASE + THREADS_FIELD_JTOC_OFFSET)
                            .load::<usize>()
                                + 4 * thread_index).load::<usize>());

                if thread.is_zero() {
                    continue;
                }

                if (thread + IS_COLLECTOR_FIELD_JTOC_OFFSET).load::<bool>() {
                    continue;
                }

                let trace_ptr = trace as *mut T;
                let thread_usize = thread.as_usize();
                jtoc_call!(SCAN_THREAD_METHOD_JTOC_OFFSET, thread_id, thread_usize, trace_ptr,
                    new_roots_sufficient);
            }
        }
    }
}