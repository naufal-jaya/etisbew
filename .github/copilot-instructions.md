ALGORITHM MaxCliqueHeuristic(Graph G)
    GLOBAL max_size = 0

    FOR i = 1 TO n DO
        v = nodes[i]
        IF Degree(v) >= max_size THEN
            U = { w in Neighbors(v) WHERE Degree(w) >= max_size }
            CALL CliqueHeu(U, 1) 
        END IF
    END FOR
    
    RETURN max_size
END ALGORITHM

FUNCTION CliqueHeu(U, current_size)
    IF U IS EMPTY THEN
        IF current_size > max_size THEN
            max_size = current_size
        END IF
        RETURN
    END IF

    u = Select vertex in U with MAX DEGREE
    Remove u from U

    valid_neighbors = { w in Neighbors(u) WHERE Degree(w) >= max_size }
    U_new = U INTERSECT valid_neighbors

    CALL CliqueHeu(U_new, current_size + 1)
END FUNCTION