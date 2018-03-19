//1. Politicians votes < 9 ASC
SELECT Politicians.name, Politicians.location, Politicians.grade_current, COUNT(*) AS TotalVote
FROM Politicians
JOIN Votes
  ON Politicians.id = Votes.politicianId
WHERE Politicians.grade_current < 9
GROUP BY  Politicians.id
ORDER BY Politicians.grade_current ASC;

//2. 3 Politicians highest votes & voters
SELECT
(SELECT COUNT(*)
	FROM Votes
	WHERE politicianId = Politicians.id
	GROUP BY politicianId
) AS totalVote, Politicians.name AS politicianName, (Voters.first_name||' ' ||Voters.last_name) AS voterName, Voters.gender
FROM Politicians
JOIN Votes
	ON Politicians.id = Votes.politicianId
JOIN Voters
	ON Voters.id = Votes.voterId
WHERE Politicians.id
IN
(SELECT Politicians.id
  FROM Votes
  JOIN Politicians
  ON Votes.politicianId = Politicians.id
  GROUP BY Politicians.id
  ORDER BY COUNT(Votes.id) DESC
  LIMIT 3
)
ORDER BY politicianName DESC;

//3. List curang, cara HAVING
SELECT COUNT(Votes.id) AS totalVote, (Voters.first_name||' '||Voters.last_name) AS name, Voters.gender, Voters.age
FROM Votes
JOIN Voters
	ON Voters.id = Votes.voterId
GROUP BY Voters.id
HAVING totalVote > 1
ORDER BY totalVote DESC

//3. List curang, cara Subquery
SELECT
(SELECT COUNT(*)
	FROM Votes
	WHERE voterId = Voters.id
	GROUP BY voterId
) AS totalVotes,
(Voters.first_name||' '||Voters.last_name) AS name, Voters.gender, Voters.age
FROM Voters
JOIN Votes
	ON Voters.id = Votes.voterId
WHERE totalVotes > 1
GROUP BY Voters.id
ORDER BY totalVotes DESC;
