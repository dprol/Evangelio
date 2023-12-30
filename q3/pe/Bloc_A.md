# Bloc A

## Probabilitat condicionada

La probabilitat del succés A un cop s'ha donar B pot variar de la probabilitat de B si A i B són successos **dependents.**

$$
\text{si } P(A) \neq P(A|B) \implies \text{A i B dependents} \\
\text{si } P(A) = P(A|B)  \implies \text{A i B independents}
$$

Llavors per a calcular-la reduim a B la probabilitat de A de la seguent manera:

$$
P(A|B) = \frac{P(A \cap B)}{P(B)}
$$

## Fòrmula de Bayes

$$
P(A|B) = \frac{P(B|A)*P(A)}{P(B)}
$$

## Variables aleatories

Una variable aleatòria és una aplicació entre la recta real i el conjunt $\Omega$. Cada valor de la recta, o sigui cada valor que adopta la variable, indueix una **partició** de $\Omega$.

Les probabilitats dels succesos de $\Omega$ es transfereixen als valors de la variable, definint dos funcions:

+ **Funció de probabilitat**

+ **Distribució de probabilitat** 

#### Variable aleatòria discreta

Pren només valors enters positius (incloent el 0) (enumerables). La funció de probabilitat indica la probabilitat del succes al que el valor de la variable fa referencia. La funció de distribució indica la probabilitat **acumulada** del succesos als que fan referencia el valors més petits o iguals que el donat.
