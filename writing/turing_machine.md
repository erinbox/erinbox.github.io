# Turing machine (simple)

## Effectively calculable

We consider the notion of an effective procedure, i.e. a set of steps a person or computer can follow in the real world to achieve a goal.

We can formalise this intuition with the idea of a sequence of symbols taken from some finite set, and a human or mechanical operator, looking at a particular slot in the sequence, deciding which slot to modify or look at next based on the symbol being viewed and some internal state. More precisely:

$\mathcal{M}=\langle \Gamma, \square, Q, q_0, \delta\rangle$ where

- $\Gamma$ is a finite set of **symbols**;
- $\square \in \Gamma$ is the **blank symbol**;
- $Q$ is a finite set of **states**;
- $q_0 \in Q$ is the **start state**;
- $\delta : Q \times \Gamma \rightharpoonup Q \times (\Gamma \sqcup \{ -1, +1\})$ is the **partial transition function**.

We define a **configuration** as a triple $\langle t, i, q\rangle$ where

- $t : \N \to \Gamma$ is the current **tape**;
- $i \in \N$ is the current **tape head**;
- $q \in Q$ is the current state.

We define a partial function $\rightsquigarrow$ on configurations as

$$
\langle t_1, i_1, q_1\rangle \rightsquigarrow \langle t_2, i_2, q_2\rangle \iff \delta(q_1,t_1(i_1)) = (q_2, (t_2(i_2))\land i_1 = i_2
$$

## asodifj


One may observe that there are countably infinitely many effective procedures, but uncountably infinitely many functions $f : \N \to \N$ (by Cantor&#8217;s theorem). Therefore we seek some

blah

A function $f : \N \to \N$ is **computable** if there is some effective procedure which, when given any input $n$, returns $f(n)$. Note that since there are $\aleph_0$ effective procedures and $2^{\aleph_0}$ such functions $f$, by Cantor&#8217;s theorem we have $\aleph_0 < 2^{\aleph_0}$.

$$
\operatorname{next}(t,a) = \operatorname{case}(a) \begin{cases}
\text{print}[b] &\mapsto 57\\
\text{go\_to\_if}[b,n] & \mapsto 6 \\
\text{stop} &\mapsto 3
\end{cases}
$$

## Davis Turing&ndash;Post machine

A **Turing&ndash;Post program** is a finite list of statements $s_0,\ldots,s_{n-1}$ where each $s_i$ is of the following form (where $b \in \{ \mathbf{0}, \mathbf{1}\}$ and $k \in \N$ and $k < n$):

- $\text{print}(b)$
- $\text{go\_to\_if}(k,b)$
- $\text{stop}$



## stuff

Let $\mathbb{B} = \{ 0,1\}$.

A **Turing machine** is a tuple $M =\langle Q, q_0, F, \delta\rangle$ where

- $Q$ is a set of **states**;
- $q_0 \in Q$ is the **start state**;
- $\delta : Q \times \mathbb{B} \rightharpoonup Q \times \mathbb{B} \times \{-1, +1\}$ is the (partial) **transition function**.

A **configuration** is a tuple $\langle t,q,i\rangle$ where

- $t : \N \to \mathbb{B}$ is the **tape**;
- $q \in Q$ is the current machine state;
- $i \in \N$ is the **tape head**.

Define $\langle t_1,q_1,i_1\rangle \rightsquigarrow \langle t_2,q_2,i_2\rangle \iff \delta(q_1,t_1(i_1)) = (q_2,t_2(i_2), i_2-i_1)$.

Define the **function induced by a Turing machine $M$** as the partial function $f_M : \N \rightharpoonup \N$ where $f_M(n)$ is as follows:

- Let $t_0(k) = \lfloor n / 2^k \% 2\rfloor$, $i_0 = 0$ WRONG
- Repeatedly evaluate $\rightsquigarrow$ on $\langle t_0, q_0, i_0\rangle$; if it stops at $\langle t_N, q_N, i_N\rangle$, define $f_M(n)=\sum_{k=0}^\infty t_N(k)\cdot 2^k$ (guaranteed to be finite).

```hs
encode_binary :: Integer -> [Bool]
encode_binary n = map (\k -> n/(2**k) % 2) [0..]

decode_binary :: [Bool] -> Integer
decode_binary xs = foldr (\acc x -> x 3) 0 . zip [0..]

data Dir = Left | Right
data TuringMachine s = {
  , start_state :: s
  , trans_func :: s -> Bool -> Maybe (s, Bool, Dir)
}

data Config s = {
  , tape :: [Bool]
  , current_state :: s
  , head :: Integer
}

transition :: TuringMachine s -> Config s -> Maybe (Config s)
transition { .., trans_func } { tape, current_state, head } =
  fmap (\(q1, i1, d1) -> )
  (trans_func current_state (tape !! head))
```

## The Church&ndash;Turing thesis

The Church&ndash;Turing thesis is the belief that the intuitive notion of effective calculability in the real world is captured by the equivalently-powerful formalisms of Turing machines, register machines, lambda calculus, general recursive functions, SK combinators, C++ templates, and so on. This being an informal thesis