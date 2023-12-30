# Resum del segon Control de Laboratori

## SAT amb costos

La idea de **SAT** amb costos es definir un predicat que donat un cost, escrigui les **clausules** necessàries per a que es compleixi. Després, iterarem de manera **descendent en cost** per a trobar la solució amb menys cost possible. Així, generem solucions del nostre problema de cost **n-1** en cada iteració fins que *kissat* retorni que és insatisfactible el model proposat.

### Min coloring:

```prolog
%%%%%%% =======================================================================================
%
% Our LI Prolog template for solving problems using a SAT solver.
%
% It generates the SAT clauses, calls the SAT solver, shows the solution and computes its cost.
% Just specify:
%       1. SAT Variables
%       2. Clause generation
%       3. DisplaySol: show the solution.
%       4. CostOfThisSolution: computes the cost
%
%%%%%%% =======================================================================================

symbolicOutput(0).  % set to 1 for DEBUGGING: to see symbolic output only; 0 otherwise.



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% Find the minimal number of colors needed to color a graph.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%% Begin example input %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

numNodes(15).
adjacency(1, [  2,3,4,5,6,    9,10,11,12,13,14,15]).
adjacency(2, [1,  3,4,5,6,7,  9,   11,12,      15]).
adjacency(3, [1,2,  4,5,6,7,8,9,10,   12,13,14   ]).
adjacency(4, [1,2,3,  5,6,7,  9,10,11,12,13,   15]).
adjacency(5, [1,2,3,4,    7,8,9,      12,13,   15]).
adjacency(6, [1,2,3,4,      8,  10,11,         15]).
adjacency(7, [  2,3,4,5,    8,9,10,11,      14   ]).
adjacency(8, [    3,  5,6,7,  9,10,      13,14,15]).
adjacency(9, [1,2,3,4,5,  7,8,     11,         15]).
adjacency(10,[1,  3,4,  6,7,8,     11,12,   14,15]).
adjacency(11,[1,2,  4,  6,7,  9,10,   12,13,14   ]).
adjacency(12,[1,2,3,4,5,        10,11,   13,14,15]).
adjacency(13,[1,  3,4,5,    8,     11,12,   14,15]).
adjacency(14,[1,  3,      7,8,  10,11,12,13,   15]).
adjacency(15,[1,2,  4,5,6,  8,9,10,   12,13,14   ]).

%%%%%%% End example input %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


%%%%%%% Some helpful definitions to make the code cleaner: ====================================

node(I):-   numNodes(N), between(1,N,I).
edge(I,J):- adjacency(I,L), member(J,L).
color(C):-  numNodes(N), between(1,N,C).

%%%%%%% End helpful definitions ===============================================================


%%%%%%%  1. Declare SAT variables to be used: =================================================

% x(I,C)    meaning  "node I has color C"
satVariable( x(I,C) ):- node(I), color(C).


%%%%%%%  2. Clause generation for the SAT solver: =============================================

% This predicate writeClauses(MaxCost) generates the clauses that guarantee that
% a solution with cost at most MaxCost is found

writeClauses(infinite):- !, numNodes(N), writeClauses(N),!.
writeClauses(MaxColors):-
    eachNodeExactlyOnecolor(MaxColors),
    noAdjacentNodesWithSameColor(MaxColors),
    true,!.
writeClauses(_):- told, nl, write('writeClauses failed!'), nl,nl, halt.

eachNodeExactlyOnecolor(MaxColors):- 
    node(I), findall(x(I,C), between(1,MaxColors,C), Lits ), exactly(1,Lits), fail.
eachNodeExactlyOnecolor(_).

noAdjacentNodesWithSameColor(MaxColors):- 
    edge(I,J), between(1,MaxColors,C), writeOneClause([ -x(I,C), -x(J,C) ]), fail.
noAdjacentNodesWithSameColor(_).

%%%%%%%  4. This predicate computes the cost of a given solution M: ===========================

% Here the sort predicate is used to remove repeated elements of the list:
costOfThisSolution(M,Cost):- findall(C,member(x(_,C),M),L), sort(L,L1), length(L1,Cost), !.

```

Com podem veure, es tracta del problema de **min coloring**, en el que volem pintar els nodes de un graf sense que n'hi hagi dos adjacents del mateix color. Definim el **cost** de una solució com el nombre de colors necessaris diferents que necessitem per a complir les restriccions del problema. Aquí té molt sentit la existència del cost, ja que si no ens interesés la solució del problema podria ser sempre utilitzar un color diferent per a cada node.

La línea `costOfThisSolution(M,Cost):- findall(C,member(x(_,C),M),L), sort(L,L1), length(L1,Cost), !.` defineix el predicat de cost, que imposa que el cost de la solució es **Cost** sempre que la longitud de la llista sense repeticions (per això el `sort(L, L1`) dels colors utilitzats sigui de longitud **Cost**.

El **main**, que no esta aquí, busca solucions de cost descendent fins que el problema es torna insatisfactible, i retorna la ultima solució factible.

### Factory:

```prolog
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%% We have a factory of concrete products (beams, walls, roofs) that
%% works permanently (168h/week).  Every week we plan our production
%% tasks for the following week.  For example, one task may be to produce
%% a concrete beam of a certain type, which takes 10 hours and requires
%% (always one single unit of) the following resources: platform, crane,
%% truck, mechanic, driver.  But there are only a limited amount of units
%% of each resource available. For example, we may have only 3 trucks.  We
%% have 168 hours (numbered from 1 to 168) for all tasks, but we want to
%% finish all tasks as soon as possible.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

maxHour(168).

%% task( taskID, Duration, ListOFResourcesUsed ).
task(1,19,[1,2]).
task(2,52,[1,2]).
task(3,16,[1,3]).
task(4,52,[1,3]).
task(5,16,[2,3]).
task(6,20,[2,3]).
task(7,45,[2,3]).

%% resourceUnits( resourceID, NumUnitsAvailable ).
resourceUnits(1,2).
resourceUnits(2,1).
resourceUnits(3,2).

%%%%%%% Some helpful definitions to make the code cleaner: ====================================

task(T):-              task(T,_,_).
duration(T,D):-        task(T,D,_).
usesResource(T,R):-    task(T,_,L), member(R,L).

%%%%%%%  1. Declare SAT variables to be used: =================================================

satVariable( start(T,H) ):- task(T), integer(H).   % "task T starts at hour H"
satVariable( usage(T, H, R) ):- task(T), integer(H), integer(R). % task T uses resource R in hour H

%%%%%%%  2. Clause generation for the SAT solver: =============================================

% This predicate writeClauses(MaxCost) generates the clauses that guarantee that
% a solution with cost at most MaxCost is found

writeClauses(infinite):- !, maxHour(M), writeClauses(M),!.
writeClauses(MaxHours):-
    eachTaskStartsOnce(MaxHours),    % fa la restriccio de cost tambe   
    implicacioResources(MaxHours),
    resourcesMax,
    true,!.
writeClauses(_):- told, nl, write('writeClauses failed!'), nl,nl, halt.


horaIniciValida(T, H, MaxHours):-
        between(1, MaxHours, H),
        duration(T, D),
        End is H + D - 1,
        End =< MaxHours.


eachTaskStartsOnce(infinite):-!.
eachTaskStartsOnce(MaxHours):-
        task(T),
        findall(start(T, H), horaIniciValida(T, H, MaxHours), Lits), exactly(1, Lits),
        fail.
eachTaskStartsOnce(_).


% Implication between a task's start time and its resource usage throughout its duration
implicacioResources(MaxHours) :-
    task(T),
    horaIniciValida(T, Hini, MaxHours),
    duration(T, D),
    Hfi is Hini + D,
    between(Hini, Hfi, H),
    usesResource(T, R),
    writeOneClause([-start(T, Hini), usage(T, H, R)]),
    fail.
implicacioResources(_).

% Enforce constraints on resource usage within available limits per hour
resourcesMax :-
    resourceUnits(R, Units),
    maxHour(mH),
    between(1, maxHour, H),
    findall(usage(T, H, R), task(T), ResourceHourUsages),
    atMost(Units, ResourceHourUsages),
    fail.
resourcesMax.

%%%%%%%  4. This predicate computes the cost of a given solution M: ===========================

costOfThisSolution(M,Cost):- findall(End, ( member(start(T,H),M), duration(T,D), End is H+D-1), L),  max_list(L,Cost),!.
```

En aquest cas tenim un problema d'una fàbrica que fabrica tres tipus de productes diferents, i ho fa en tasques que utilitzen recursos limitats durant el temps en el que transcorren. La idea es definir una hora de inici valida per a cada tasca de tal manera que mai s'utilitzin més recursos dels que es tenen, **minimitzant el temps total**, definit com la hora de acabada de la ultima tasca. Les clausules defineixen en **SAT** les restriccions de consumició de recursos. Per a definir la **restricció de cost** tenim el següent.

```prolog
costOfThisSolution(M,Cost):- findall(End, ( member(start(T,H),M), duration(T,D), End is H+D-1), L),  max_list(L,Cost),!.
```

El que fem es trobar totes del hores de inici de les tasques i guardar aquest valor sumat de la seva duració. Després, el cost es definit per el màxim de tots els elements trobats. De la mateixa manera que en el **min coloring**, el programa *main* iterarà en **cost descendent** fins a trobar model **SAT** insatisfactible, i retornarà la última solució factible.

## Prolog avançat




