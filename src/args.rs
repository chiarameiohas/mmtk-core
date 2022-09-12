use spin::Lazy;
use std::env;

// ---------- Immix flags ---------- //
/// Mark lines when scanning objects. Otherwise, do it at mark time.
pub const MARK_LINE_AT_SCAN_TIME: Lazy<bool> = Lazy::new(|| {
    env::var("MARK_LINE_AT_SCAN_TIME")
        .map(|x| x != "0")
        .unwrap_or(false)
});

