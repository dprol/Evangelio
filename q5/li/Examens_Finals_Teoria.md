# Examens finals resolts

## 1.

**a)**

> Let f be a binary function symbol. Consider the two first-order interpretations **I1** and **I2**:
> 
> + **D_I1** = N (the natural numbers), **f_I1(n,m)** = n\*m
> 
> + **D_I2** = Z (the integers), **f_I2(n,m)** = n\*m
> 
> Write a formula F in first-order with equality (FOLE), with NO other function or predicate symbols than f and equality, such that F distinguishes I1 and I2, that is, such that F is true in one of I1 or I2 and false in the other. Give NO explanations. Hint: express "for every non-zero x there is another number y with the same square". But express "non-zero" using only f!

En aquest exercici demanen donar una formula **F**, en **LPOI**, per la qual sigui certa en una interpretació i falsa en l'altre. El domini de la primera son els **naturals**, i en la segona els **enters**. En ambdues, **f** representa la **multiplicació** de dos nombres. Ens donen un **pista**: que expressem la propietat de que en el **enters** (on tenim **negatius**), per tots aquells diferents de 0, sempre hi ha nombres que tenen el mateix quadrat, es a dir, l'arrel positiva i la negativa (-1\*-1 = 1\*1). Ho fem expressant que per tot element que quan multipliquem per qualsevol altre dona un nombre diferent de si mateix (es a dir tots el nombres excepte el zero), això implica que n'ha d'existir un altre que té el mateix quadrat. Això s'escriu de la següent manera:

**`F:    Ax ( Ez f(x,z)!=x --> Ey ( x!=y & f(x,x)=f(y,y) ) )`**

**b)**

> Answer the same question, but now:
> 
> + **D_I1** = Q (the rational numbers), **f_I1(n,m)** = n\*m
> 
> + **D_I2** = R (the real numbers), **f_I2(n,m)** = n\*m

Ens demanen el mateix però ara domini de la primera interpretació son els **racionals** i el de la segona els **reals**. La funció **f** segueix representant la **multiplicació**. Demanen el mateix, donar una formula **F** tal que només una de les dues interpretacions en sigui model. Ho fem així:

**`F:    Ax Ey f(f(y,y),f(y,y)) = f(x,x) ("every square has a fourth root"; false in Q, true in R).`**

---

## 2.

> Is the following formula satisfiable? Answer YES or NO and prove it.
> `Ax -p(x,x) & AxAyAz( p(x,y)&p(y,z) -> p(x,z) ) & AxEy p(x,y) & ExAy -p(y,x)`

Per a resoldre aquest exercici ens hem de fixar en quines propietat te el predicat binari **p**:

+ **p** no es reflexiu: `Ax -p(x,x)`

+ **p** es transitiu: `AxAyAz( p(x,y)&p(y,z) -> p(x,z) )`

+ per tot element del **x** domini n'existeix dos altres, un **y** que compleix `p(x,y)`

+ hi ha un element que no compleix **p** amb cap altre del domini

Per tant, podem veure que p es un predicat d'ordre estricte. Per a donar una interpretació que compleixi la fòrmula, necessitem un domini infinit, en el qual poguem definir un predicat binari d'ordre, i on existeixi un element que no tingui cap element que compleixi **p**. Per exemple:

+ **D_I**: Naturals

+ **p(x, y)** = x > y

Tindrem que mai es complirà `p(x,x)` ja que un nombre no es mes gran que ell mateix. També satisfarem la transitivitat, i tindrem que per cada nombre sempre n'hi haurà un de mes gran. Finalment, el **0**, serà l'element del domini que mai complirà **p** amb cap altre element, ja que no hi ha **0** no es més gran que cap element del domini dels naturals.

---

## 3.


