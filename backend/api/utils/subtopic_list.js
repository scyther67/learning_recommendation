module.exports = {
    subtopic_list: [
        "SELECT",
        "UPDATE",
        "GROUP BY",
        "CREATE",
        "INSERT",
        "DELETE",
        "JOINS",
        "PREDICATE",
        "SET OPERATORS",
        "AGGREGATION"
    ],
    predecessor_dict : {
        "SELECT": [0],
        "UPDATE": [1],
        "GROUP BY": [0, 2],
        "CREATE": [3],
        "INSERT": [4],
        "DELETE": [5],
        "JOINS": [0, 6],
        "PREDICATE": [0, 7],
        "SET OPERATORS": [0, 8],
        "AGGREGATION": [2, 9],
      }
}