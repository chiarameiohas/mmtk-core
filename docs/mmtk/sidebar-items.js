initSidebarItems({"enum":[["AllocationSemantics","Allocation semantics that MMTk provides. Each allocation request requires a desired semantic for the object to allocate."],["BarrierSelector","BarrierSelector describes which barrier to use."]],"mod":[["memory_manager","VM-to-MMTk interface: safe Rust APIs."],["mmtk",""],["plan","GC algorithms from the MMTk suite."],["policy","Memory policies that can be used for spaces."],["scheduler","A general scheduler implementation. MMTk uses it to schedule GC-related work."],["util","Utilities used by other modules, including allocators, heap implementation, etc."],["vm","MMTk-to-VM interface: the VMBinding trait."]],"struct":[["MMTK","An MMTk instance. MMTk allows multiple instances to run independently, and each instance gives users a separate heap. Note that multi-instances is not fully supported yet"],["Mutator","A mutator is a per-thread data structure that manages allocations and barriers. It is usually highly coupled with the language VM. It is recommended for MMTk users 1) to have a mutator struct of the same layout in the thread local storage that can be accessed efficiently, and 2) to implement fastpath allocation and barriers for the mutator in the VM side."]],"trait":[["MutatorContext","Each GC plan should provide their implementation of a MutatorContext. Note that this trait is no longer needed as we removed per-plan mutator implementation and we will remove this trait as well in the future."],["ObjectQueue","This trait represents an object queue to enqueue objects during tracing."],["Plan","A plan describes the global core functionality for all memory management schemes. All global MMTk plans should implement this trait."],["PolicyCopyContext","A GC worker’s copy allocator for copying GCs. Each copying policy should provide their implementation of PolicyCopyContext. If we copy objects from one policy to a different policy, the copy context of the destination policy should be used. For example, for generational immix, the nursery is CopySpace, and the mature space is ImmixSpace. When we copy from nursery to mature, ImmixCopyContext should be used. Note that this trait should only be implemented with policy specific behaviors. Please refer to GCWorkerCopyContext which implements common behaviors for copying."]]});