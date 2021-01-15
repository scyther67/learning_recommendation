module.exports = {
    subtopic_list: [
        "SELECTFROM",
        "WHERE",
        "DISTINCT",
        "SET OPERATORS",
        "PREDICATE",
        "JOINS",
        "SUBQUERY",
        "AGGREGATION",
        "GROUP BY",
        "HAVING",
        "ORDER BY"
    ],
    extra_subtopics: [
        "UPDATE",
        "CREATE",
        "INSERT",
        "DELETE",
    ],
    predecessor_dict : {
        "SELECTFROM":[0],
        "WHERE":[0, 1],
        "DISTINCT":[0, 2],
        "SET OPERATORS":[1, 3],
        "PREDICATE": [1, 4],
        "JOINS": [0, 5],
        "SUBQUERY": [5, 6],
        "AGGREGATION": [0, 7],
        "GROUP BY": [7, 8],
        "HAVING": [8, 9],
        "ORDER BY": [0, 10]
      }
}