initSidebarItems({"fn":[["add_finalizer","Register a finalizable object. MMTk will retain the liveness of the object even if it is not reachable from the program. Note that finalization upon exit is not supported."],["add_phantom_candidate","Add a reference to the list of phantom references. A binding may call this either when a weak reference is created, or when a weak reference is traced during GC."],["add_soft_candidate","Add a reference to the list of soft references. A binding may call this either when a weak reference is created, or when a weak reference is traced during GC."],["add_weak_candidate","Add a reference to the list of weak references. A binding may call this either when a weak reference is created, or when a weak reference is traced during GC."],["add_work_packet","Add a work packet to the given work bucket. Note that this simply adds the work packet to the given work bucket, and the scheduler will decide when to execute the work packet."],["add_work_packets","Bulk add a number of work packets to the given work bucket. Note that this simply adds the work packets to the given work bucket, and the scheduler will decide when to execute the work packets."],["alloc","Allocate memory for an object. For performance reasons, a VM should implement the allocation fast-path on their side rather than just calling this function."],["bind_mutator","Request MMTk to create a mutator for the given thread. For performance reasons, A VM should store the returned mutator in a thread local storage that can be accessed efficiently."],["calloc","The standard calloc."],["counted_calloc","The standard calloc except that with the feature `malloc_counted_size`, MMTk will count the allocated memory into its heap size. Thus the method requires a reference to an MMTk instance."],["counted_malloc","The standard malloc except that with the feature `malloc_counted_size`, MMTk will count the allocated memory into its heap size. Thus the method requires a reference to an MMTk instance. MMTk either uses its own allocator, or forward the call to a library malloc."],["destroy_mutator","Reclaim a mutator that is no longer needed."],["disable_collection","Disallow MMTk to trigger garbage collection. When collection is disabled, you can still allocate through MMTk. But MMTk will not trigger a GC even if the heap is full. In such a case, the allocation will exceed the MMTk’s heap size (the soft heap limit). However, there is no guarantee that the physical allocation will succeed, and if it succeeds, there is no guarantee that further allocation will keep succeeding. So if a VM disables collection, it needs to allocate with careful consideration to make sure that the physical memory allows the amount of allocation. We highly recommend not using this method. However, we support this to accomodate some VMs that require this behavior. This call does not disable explicit GCs (through handle_user_collection_request()). Note this call is not thread safe, only one VM thread should call this."],["enable_collection","Allow MMTk to trigger garbage collection when heap is full. This should only be used in pair with disable_collection(). See the comments on disable_collection(). If disable_collection() is not used, there is no need to call this function at all. Note this call is not thread safe, only one VM thread should call this."],["flush_mutator","Flush the mutator’s local states."],["free","The standard free. The `addr` in the arguments must be an address that is earlier returned from MMTk’s `malloc()`, `calloc()` or `realloc()`."],["free_bytes","Return free memory in bytes."],["free_with_size","The standard free except that with the feature `malloc_counted_size`, MMTk will count the allocated memory into its heap size. Thus the method requires a reference to an MMTk instance, and the size of the memory to free. The `addr` in the arguments must be an address that is earlier returned from MMTk’s `malloc()`, `calloc()` or `realloc()`."],["gc_poll","Poll for GC. MMTk will decide if a GC is needed. If so, this call will block the current thread, and trigger a GC. Otherwise, it will simply return. Usually a binding does not need to call this function. MMTk will poll for GC during its allocation. However, if a binding uses counted malloc (which won’t poll for GC), they may want to poll for GC manually. This function should only be used by mutator threads."],["get_all_finalizers","Pop all the finalizers that were registered for finalization. The returned objects may or may not be ready for finalization. After this call, MMTk’s finalizer processor should have no registered finalizer any more."],["get_allocator_mapping","Return an AllocatorSelector for the given allocation semantic. This method is provided so that VM compilers may call it to help generate allocation fast-path."],["get_finalized_object","Get an object that is ready for finalization. After each GC, if any registered object is not alive, this call will return one of the objects. MMTk will retain the liveness of those objects until they are popped through this call. Once an object is popped, it is the responsibility of the VM to make sure they are properly finalized before reclaimed by the GC. This call is non-blocking, and will return None if no object is ready for finalization."],["get_finalizers_for","Pop finalizers that were registered and associated with a certain object. The returned objects may or may not be ready for finalization. This is useful for some VMs that may manually execute finalize method for an object."],["handle_user_collection_request","Trigger a garbage collection as requested by the user."],["harness_begin","Generic hook to allow benchmarks to be harnessed. We do a full heap GC, and then start recording statistics for MMTk."],["harness_end","Generic hook to allow benchmarks to be harnessed. We stop collecting statistics, and print stats values."],["initialize_collection","Initialize the scheduler and GC workers that are required for doing garbage collections. This is a mandatory call for a VM during its boot process once its thread system is ready. This should only be called once. This call will invoke Collection::spawn_gc_thread() to create GC threads."],["is_in_mmtk_spaces","Return true if the `object` lies in a region of memory where"],["is_live_object","Is the object alive?"],["is_mapped_address","Is the address in the mapped memory? The runtime can use this function to check if an address is mapped by MMTk. Note that this is different than is_in_mmtk_spaces(). For malloc spaces, MMTk does not map those addresses (malloc does the mmap), so this function will return false, but is_in_mmtk_spaces will return true if the address is actually a valid object in malloc spaces. To check if an object is in our heap, the runtime should always use is_in_mmtk_spaces(). This function is_mapped_address() may get removed at some point."],["is_mmtk_object","Check if `addr` is the address of an object reference to an MMTk object."],["last_heap_address","Return the ending address of the heap. Note that currently MMTk uses a fixed address range as heap."],["malloc","The standard malloc. MMTk either uses its own allocator, or forward the call to a library malloc."],["mmtk_init","Initialize an MMTk instance. A VM should call this method after creating an MMTK instance but before using any of the methods provided in MMTk (except `process()` and `process_bulk()`)."],["modify_check","Check that if a garbage collection is in progress and if the given object is not movable.  If it is movable error messages are logged and the system exits."],["num_of_workers","Get the number of workers. MMTk spawns worker threads for the ‘threads’ defined in the options. So the number of workers is derived from the threads option. Note the feature single_worker overwrites the threads option, and force one worker thread."],["on_closure_end","Add a callback to be notified after the transitive closure is finished. The callback should return true if it add more work packets to the closure bucket."],["post_alloc","Perform post-allocation actions, usually initializing object metadata. For many allocators none are required. For performance reasons, a VM should implement the post alloc fast-path on their side rather than just calling this function."],["post_write_barrier","The write barrier by MMTk. This is a post write barrier, which we expect a binding to call after they modify an object. For performance reasons, a VM should implement the write barrier fast-path on their side rather than just calling this function."],["process","Process MMTk run-time options. Returns true if the option is processed successfully."],["process_bulk","Process multiple MMTk run-time options. Returns true if all the options are processed successfully."],["realloc","The standard realloc."],["realloc_with_old_size","The standard realloc except that with the feature `malloc_counted_size`, MMTk will count the allocated memory into its heap size. Thus the method requires a reference to an MMTk instance, and the size of the existing memory that will be reallocated. The `addr` in the arguments must be an address that is earlier returned from MMTk’s `malloc()`, `calloc()` or `realloc()`."],["start_control_collector","Run the main loop for the GC controller thread. This method does not return."],["start_worker","Run the main loop of a GC worker. This method does not return."],["starting_heap_address","Return the starting address of the heap. Note that currently MMTk uses a fixed address range as heap."],["total_bytes","Return the total memory in bytes."],["used_bytes","Return used memory in bytes."]]});