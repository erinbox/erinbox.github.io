# The Hamming bound

Let $Q$ be a finite set and fix $n \in \N$.

Define a **word** as an element of $Q^n$.

Define the **distance** $\Delta$ between words $c = c_1\cdots c_n$ and $d = d_1\cdots d_n$ as $\sum_{i=1}^n (1 - \delta_{c_id_i})$, i.e. the number of characters on which they differ. ($\delta$ denotes the Kronecker delta function.)

Call $\Gamma \subseteq Q^n$ a **block code**, its elements **codewords** and define its **Hamming distance** $d$ as the minimum distance between any two codewords.

Then the __Hamming bound__ states that

$$
|\Gamma| \leq \frac{q^n}{\sum_{k=0}^t \binom{n}{k} (q-1)^k}
$$

where $t = \lfloor(d-1)/2\rfloor$.

**Proof.** There are $\binom{n}{k}(q-1)^k$ words with distance $k$ from any word $w$, and hence $\sum_{k=0}^r \binom{n}{k} (q-1)^k$ words in a ball of radius $r$ around $w$.

By definition of Hamming distance, balls of radius $t = \lfloor(d-1)/2\rfloor$ around each codeword do not intersect. Since there are $q^n$ words in total, we have

$$
|\Gamma| \leq \frac{q^n}{\sum_{k=0}^t \binom{n}{k} (q-1)^k}
$$

as required. $\blacksquare$


## Lagrange's theorem

A **group** is a set $G$ along with a binary operation $(\cdot) : G \times G \to G$ on $G$ such that for all $a,b,c$ in $G$,

- (identity) There exists an $e$ in $G$ such that $ae = ea = a$
- (associativity) $(ab)c = a(bc)$
- (inverses): There exists $a^{-1}$ such that $aa^{-1} = a^{-1}a = e$.

A **subgroup** is a subset $H \subseteq G$ such that $H$ is a group under the same operation.

The **order** of a finite group $G$ is $|G|$.

**Lagrange's theorem** is a foundational theorem in group theory that for any subgroup $H$ of a finite group $G$, $|H|$ divides $|G|$.

**Proof.** For any $g$ in $G$, define its **left coset** $gH = \{ gh \mid h \in H\}$. (Observe that $g \in gH$ since $e \in H$.) Since $a \mapsto ga$ is a bijection (with inverse $a \mapsto g^{-1}a$), $|gH| = |H|$ for any $g$. For $g, g'$ in $G$, either $gH$ and $g'H$ are disjoint or there exists an $a$ such that $agh = ag'h'$ for $h, h'$ in $H$, which implies $g = g'h'h^{-1}$ and $g' = gh(h')^{-1}$ and in turn $gH=g'H$.

Therefore $G$ is partitioned by left cosets of equal size $|H|$, which implies that $|H|$ divides $|G|$. $\blacksquare$

### Attempt 2 phrasing

For $g$ in $G$, define its **left coset** $gH = \{ gh \mid h \in H\}$.

- Since $e \in H$, $g \in gH$ for all $g$.
- Since $a \mapsto ga$ is a bijection (with inverse $a \mapsto g^{-1}a$), $|gH| = |H|$ for all $g$.
- For $g_1,g_2$ in $G$, either $g_1H$ and $g_2H$ are disjoint or there exist $a,h_1,h_2$ with $ag_1h_1=ag_2h_2$, in which case $g_1=g_2h_2h_1^{-1}$ and $g_2 = g_1h_1h_2^{-1}$ imply $g_1H=g_2H$.

Therefore $G$ is partitioned by left cosets of equal size $|H|$, and hence $|H|$ divides $|G|$.

A partition of a set $X$ is a set $\mathcal{F}\subseteq \mathcal{P}(X)$ satisfying

1. $\emptyset \notin \mathcal{F}$
2. $\bigcup \mathcal{F} = X$
3. $\forall A,B \in \mathcal{F}.\,A = B\implies A \cap B = \emptyset$


## Banach fixed-point theorem

A metric space is a pair $(X,d)$ consisting of a set $X$ and a function $d : X\times X \to \R_{\geq 0}$ satisfying for all $x,y,z \in X$

1. $d(x,y) = 0 \iff x = y$;
2. $d(x,y) = d(y,x)$;
3. $d(x,z) \leq d(x,y)+d(y,z)$.

A sequence $x_1,x_2,x_3,\ldots$ converges to a limit $\lim_{n\to\infty}x_n = x$ iff for every $\varepsilon > 0$, there exists an $N$ such that for all $n > N$, $d(x_n, x) < \varepsilon$.

A sequence $x_1,x_2,x_3,\ldots$ is **Cauchy** if for any $\varepsilon > 0$, there exists an $N$ such that for all $m,n > N$, $d(x_m,x_n) < \varepsilon$. By the triangle inequality, every convergent sequence is Cauchy.

A metric space is **complete** if every Cauchy sequence converges to a point in the space.

For example, $\mathbb{Q}$ is not complete as the sequence $1,1.4,1.41,1.414,1.4142,\ldots$ converges to $\sqrt{2}$ which is not in $\mathbb{Q}$.

Given metric spaces $(X,d_X)$ and $(Y,d_Y)$, a function $f : X \to Y$ is **continuous at $x$** iff for every convergent sequence $(x_n)$,

$$
\lim_{n\to\infty}f(x_n) = f\left(\lim_{n\to\infty} x_n\right)\text{.}
$$

A function $f : X \to Y$ is **continuous** iff it is continuous at all $x$ in $X$.

Let $(X,d)$ be a complete metric space. Then the function $T : X \to X$ is called a **contraction mapping** iff there exists $q \in [0,1)$ such that

$$
d(T(x),T(y)) \leq qd(x,y)
$$

for all $x,y$ in $X$.

**The Banach fixed-point theorem.** Let $(X,d)$ be a non-empty complete metric space with a contraction mapping $T : X \to X$. Then $T$ has a unique fixed point $x^\ast$ (i.e. $T(x^\ast) = x^\ast$). Furthermore, for any starting element $x_0$ in $X$, the sequence $x_0,T(x_0),T(T(x_0)),\ldots$ converges to $x^\ast$.

**Proof.** First observe that for all $n$ in $\N$, we have

$d(x_{n+1},x_n) \leq q^nd(x_1,x_0)$. Then $(x_n)$ is Cauchy. Let $m > n$. Then

$$\begin{aligned}
d(x_m,x_n) &\leq d(x_m,x_{m-1})+d(x_{m-1},x_{m-2})+\cdots+d(x_{n+1},x_n)\\
&\leq q^{m-1}d(x_1,x_0)+q^{m-2}d(x_1,x_0)+\cdots+q^nd(x_1,x_0)\\
&= q^nd(x_1,x_0)\sum_{i=0}^{m-n-1} q^i\\
&\leq q^n d(x_1,x_0)\sum_{i=0}^\infty q_i\\
&= q^n d(x_1,x_0) \left(\frac{1}{1-q}\right)
\end{aligned}$$

Fix $\varepsilon > 0$ and choose $N$ such that

$$
q^N < \frac{\varepsilon(1-q)}{d(x_1,x_0)}\text{.}
$$

Then for $m,n > N$

$$\begin{aligned}
d(x_m,x_n) &\leq q^nd(x_1,x_0)\left(\frac{1}{1-q}\right) \\
&< \left(\frac{\varepsilon(1-q)}{d(x_1,x_0)}\right) d(x_1,x_0)\left(\frac{1}{1-q}\right)\\
&= \varepsilon\text{.}
\end{aligned}$$

Hence $(x_n)$ is Cauchy. By completeness of $(X,d)$, the sequence has a limit $x^\ast$ satisfying

$$
x^\ast = \lim_{n\to\infty} x_n = \lim_{n \to \infty} T(x_{n-1})=T\left(\lim_{n\to\infty} x_{n-1}\right)=T(x^\ast)\text{.}
$$

## The Eckmann&ndash;Hilton argument

Let $X$ be a set equipped with two binary operations, $$