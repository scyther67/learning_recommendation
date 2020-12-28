const predecessor_dict = {
    "SELECT": [],
    "UPDATE": [], 
    "GROUP BY": [], 
    "CREATE": [], 
    "INSERT": [],
    "DELETE": [], 
    "JOINS": [],
    "PREDICATE": [], 
    "SET OPERATORS": [], 
    "AGGREGATION": [],
    "FROM": [],
    "WHERE": [],
    "JOIN": []
}

model.exports = {
    getPrdecessorList = (subtopic) => {
        return predecessor_dict[subtopic]
    }
}