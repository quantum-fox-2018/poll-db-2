# poll-db-2
# Release 0
# 1. SELECT name, location, grade_current, 
#    (SELECT COUNT(*) FROM Votes WHERE Politicians.id = Votes.politicianId) 
#    AS totalVote FROM Politicians 
#    WHERE grade_current < 9 
#    ORDER BY totalVote ASC 
#    LIMIT 3;

# 3. SELECT (SELECT COUNT(*) FROM Votes WHERE Voters.id = Votes.voterId) 
#    AS totalVote, first_name||' '||last_name AS name, gender, age 
#    FROM Voters 
#    WHERE totalVote > 1 
#    ORDER BY totalVote DESC;