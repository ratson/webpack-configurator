var _ = require("lodash");
var defaultMerge = require("./default/merge");

// Returns a successfully merged loader. This function helps DRY up the following: preLoader, loader, and postLoader.
// They all perform the same task but attach the returned value to a different data structure.
// Used by [pre|post]loader methods to merge the given configuration into the the internal data stores.
module.exports = function(loader, name, config, resolver) {
    loader = (_.clone(loader, true) || {});

    if (typeof config == "function")
        loader.config = config(_.clone(loader.config, true) || {});
    else
        _.merge(loader, {config: config}, defaultMerge);
    
    if (resolver)
        loader.resolver = resolver;

    return loader;
};
