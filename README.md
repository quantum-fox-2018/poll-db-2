# poll-db-2

# Soal 1
#
# SELECT name, location, grade_current, (SELECT COUNT(*)
# FROM votes WHERE politicians.politician_id = votes.politician_id) AS totalVote
# FROM politicians WHERE grade_current < 9 ORDER BY totalVote ASC LIMIT 3;

#  Soal 2
#
# SELECT
(SELECT COUNT(*) FROM votes WHERE politicians.politician_id = votes.politician_id) AS totalVote,
# politicians.name AS politicianName,
# (voters.first_name || " " || voters.last_name) AS voterName,
# voters.gender AS gender
# FROM politicians LEFT JOIN votes ON
# politicians.politician_id = votes.politician_id
# LEFT JOIN voters ON
# votes.voter_id = voters.voter_id ORDER BY totalVote DESC;


#  Soal 3
#
# SELECT (SELECT COUNT(*) FROM votes WHERE voters.voter_id = votes.voter_id) AS totalVOte,
# gender, age, (first_name ||" "||last_name) AS name FROM voters WHERE totalVote > 1
# ORDER BY totalVote DESC;
