# Resum Final LI

## Concepte General

La Lògica de Primer Ordre (LPO) és un sistema lògic que amplia la lògica proposicional permetent quantificar sobre variables i expressar propietats específiques dels objectes.

La **LPOI** és una lògica que deriva de la *LPO*, on existeix un predicat binari predefinit **eq2**, que val **1** quan els paràmetres son el mateix element del domini, i **0** en cas contrari.

## Característiques Clau

- Introdueix quantificadors com "per a tot" (∀) i "existeix" (∃) per expressar relacions entre conjunts d'objectes.
- Utilitza símbols lògics, predicats i variables per a la seva formulació.
- Una **interpretació** consisteix del següent:
  - un **Domini**,
  - una **definició** de cada símbol de **funció**, que retorna un element del domini,
  - i una **definició** de cada símbol de predicat, que retorna un valor **booleà**.

## *SAT* (Satisfactibilitat Booleana)

- El problema *SAT* es refereix a determinar si una fórmula booleana pot ser avaluada com a certa mitjançant certes assignacions de valors a les variables.
- El problema *SAT* en *LPO* es **co-semi-decidible**, que vol dir que existeix algun procediment que:
  - si la resposta és **No** (F és *insat*), contesta no en **temps finit**,
  - si la resposta és **Si** pot:
    - contestar **Si** en temps finit,
    - no acabar mai.

## De LPO a SAT

1. Negacions cap a dins

2. Eliminació de conflictes de nom de variable

3. Moure quantificadors cap a dins

4. **Skolemització**
   
   - És un procediment que elimina quantificadors existencials (∃) en una fórmula lògica.
   
   - Introdueix noves funcions (funcions de *Skolem*) per reescriure la fórmula i eliminar les variables existencials.

5. Moure quantificadors cap a fora

6. Distributivitat

## Regles de deducció

- **Unificació:**
  
  - La unificació és un procés que busca una substitució comuna que faci coincidir dos termes o expressions.
  - Útil en la resolució de problemes lògics i en la simplificació de expressions, trobant assignacions de variables que facin iguals dos termes.

- **Factorització**
  
  - **Funció:** Simplificar demostracions o proves en Lògica de Primer Ordre.
  - **Objectiu:** Fusionar passos similars o idèntics en una única línia.
