pub mod plan;
pub mod tracelocal;
pub mod transitive_closure;
pub mod controller_collector_context;
mod phase;
mod trace;
pub mod mutator_context;
pub mod collector_context;
pub mod parallel_collector;
pub mod plan_constraints;
mod parallel_collector_group;

pub use self::plan::Plan;
pub use self::transitive_closure::TransitiveClosure;
pub use self::phase::Phase;
pub use self::mutator_context::MutatorContext;
pub use self::collector_context::CollectorContext;
pub use self::plan::Allocator;
pub use self::tracelocal::TraceLocal;
pub use self::parallel_collector::ParallelCollector;
pub use self::parallel_collector_group::ParallelCollectorGroup;

pub mod nogc;

#[cfg(feature = "nogc")]
pub use self::nogc as selected_plan;

pub mod nogczero;

#[cfg(feature = "nogczero")]
pub use self::nogczero as selected_plan;

pub mod semispace;

#[cfg(feature = "semispace")]
pub use self::semispace as selected_plan;

pub mod g1;

#[cfg(feature = "g1")]
pub use self::g1 as selected_plan;

pub mod markregion;

#[cfg(feature = "markregion")]
pub use self::markregion as selected_plan;


#[cfg(feature = "semispace2")]
#[path = "semispace2/mod.rs"]
pub mod selected_plan;

pub use self::selected_plan::SelectedPlan;
pub use self::selected_plan::SelectedConstraints;
