# Cantor&#8217;s theorem

Cantor&#8217;s theorem states that for any set $A$, $|A| < |\mathcal{P}(A)|$. (In other words, there exists an injection, but no bijection, from $A$ to $\mathcal{P}(A)$.)

**Theorem.** Let $f : A \to \mathcal{P}(A)$ for some set $A$. Then $f$ is not surjective.

**Proof.** If $f$ were surjective, then there would exist $a$ with $f(a) = \{ x \mid x \notin f(x)\}$, which is absurd. $\square$


----


**Theorem.** For any set $A$, $|A| < |\mathcal{P}(A)|$.

**Proof.** $a \mapsto \{ a\}$ is an injection. If a surjection $f : A \to \mathcal{P}(A)$ existed, there would exist $a$ with $f(a) = \{ x \mid x \notin f(x)\}$, which is absurd. $\square$

For finite sets, this is not very illuminating: it corresponds to the fact that $n < 2^n$ for all $n \in \N$. The real consequences of this theorem are for infinite sets. It shows that from any infinite set $X$, we can define an infinite sequence of larger sets by iterating the powerset operator.

The set $\{ x \mid x \notin f(x)\}$ is often called the diagonal set of $f$.

We can use Cantor&#8217;s theorem to show that a set of all sets $U$ leads to paradox: by definition $\mathcal{P}(U) \subseteq U$ and hence $|\mathcal{P}(U)| \leq |U| < |\mathcal{P}(U)|$.

We can also derive Russell's paradox: by instantiating $f$ with the identity function, we obtain

$$
R = \{ X \in U \mid X \notin X\}
$$

which implies that $R \in R \iff R \notin R$.

$\mathscr{p}\wpd$