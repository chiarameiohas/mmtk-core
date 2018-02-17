use ::util::constants::LOG_BYTES_IN_PAGE;

/* The (log of the) size of each region of meta data management */
pub const LOG_BYTES_IN_REGION: usize = 22;
pub const BYTES_IN_REGION: usize = 1 << LOG_BYTES_IN_REGION;
pub const REGION_MASK: usize = BYTES_IN_REGION - 1;
pub const LOG_PAGES_IN_REGION: usize = LOG_BYTES_IN_REGION - LOG_BYTES_IN_PAGE as usize;
pub const PAGES_IN_REGION: usize = 1 << LOG_PAGES_IN_REGION;