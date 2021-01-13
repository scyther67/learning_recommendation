const { predecessor_dict, subtopic_list } = require("../utils/subtopic_list"); 

module.exports = {
  getPredecessorList: (subtopic) => {
    return predecessor_dict[subtopic_list[subtopic]];
  },
};
