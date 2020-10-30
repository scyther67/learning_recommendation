export default [
  {
    question: "What does SQL stand for?",
    qid: 100,
    answers: [
      "Structured Query Language",
      "Simple Query Language",
      "Structured Question Language",
      "Simple Question Language"
    ],
    correct: 1
  },

  {
    question: "Which clause is mandatory with the clause “SELECT” in Mysql?",
    qid: 101,
    answers: ["FROM", "WHERE", "Both FROM and WHERE", "None of the above"],
    correct: 1
  },
  // {
  //   question:
  //     "What is the significance of the statement “GROUP BY d.name” in the following  MySQL statement? SELECT d.name, COUNT (emp_id) emp_no\n FROM department d INNER JOIN Employee e\n ON d.dept_id=e.emp_id \nGROUP BY d.name ",
  //   answers: [
  //     "Aggregation of the field “name” of both table",
  //     "Aggregation of the field “name” of table “department”",
  //     "Sorting of the field “name”",
  //     "None of the mentioned "
  //   ],
  //   correct: 2
  // },
  {
    question: " Which of the following belongs to an “aggregate function”?",
    qid: 102,
    answers: ["COUNT", "SUM/AVG", "MIN/MAX", "All of the mentioned"],
    correct: 4
  },
  {
    question:
      "In SQL, which command(s) are used to change a table’s storage characteristics?",
    qid: 103,
    answers: [
      "ALTER TABLE",
      "MODIFY TABLE",
      "CHANGE TABLE",
      " All of the above"
    ],
    correct: 1
  }
  // {
  //   question: "How do you insert a comment in a CSS file?",
  //   answers: [
  //     "' this is a comment",
  //     "/* this is a comment */",
  //     "// this is a comment",
  //     "// this is a comment //"
  //   ],
  //   correct: 2
  // },
  // {
  //   question: "Which property is used to change the background color?",
  //   answers: ["color", "bgcolor", "background-color", "bgColor"],
  //   correct: 3
  // },
  // {
  //   question: "How do you add a background color for all <h1> elements?",
  //   answers: [
  //     "all.h1 {background-color:#FFFFFF;}",
  //     "h1.setAll {background-color:#FFFFFF;}",
  //     "h1.all {background-color:#FFFFFF;}",
  //     "h1 {background-color:#FFFFFF;}"
  //   ],
  //   correct: 4
  // }
];
