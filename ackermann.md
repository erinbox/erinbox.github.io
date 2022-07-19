I think: remove this section entirely. Have section 1 be primrec functions as ordinarily explained, then section 2 be the list version and possibly top it off with a formal proof.

# Proof that the Ackermann function is not primitive recursive: a mathematical characterisation and a functional-programming characterisation formally proved in Isabelle

# the Ackermann function is not primitive recursive: a mathematical proof, an equivalent characterisation formally proved in Isabelle, and a meditation on notation and its limitations on our imagination

# The Ackermann function is not primitive recursive: two formulations, learning Isabelle, and a reflection on the consequences of notation

I wrote this post as an exploration of traditional mathematical and functional-programming expressions of mathematical problems, and as a first experiment with Isabelle.

## The primitive recursive functions

The primitive recursive functions are a family of functions $f^k : \N^k \to \N$ for $k \in \N$ defined inductively as follows. The following are primitive recursive functions:

- $\operatorname{zero}^0 = 0$
- $\operatorname{succ}^1(x) = x+1$
- $\operatorname{proj}^k_i(x_1,\ldots,x_k) = x_i$ for $k,i \in \N$, $i \in [1,\ldots,k]$

Given $h^m$ and $g_1^k,\ldots,g_m^k$ in $\text{PRIM}$, define their composition $h \circ (g_1,\ldots,g_m)$ as $f^k$ such that

$$
f(\mathbf{x}) = h(g_1(\mathbf{x}),\ldots,g_m(\mathbf{x}))
$$

Given $g^k$ and $h^{k+2}$ in $\text{PRIM}$, define their primitive recursion $\rho(g,h)$ as $f^{k+1}$ such that

$$\begin{aligned}
f(0,\mathbf{x}) &= g(\mathbf{x}) \\
f(y+1,\mathbf{x}) &= h(y,f(y,\mathbf{x}),\mathbf{x})\\
\end{aligned}$$

It is this $\rho$-operator, corresponding to bounded `for`-loops in many programming languages, that characterises the primitive recursive functions.

We can observe that all primitive recursive functions are total (defined for every input). A natural question to ask is whether all total functions are primitive recursive. It turns out the answer is no: there are pathological functions such as the Ackermann function which are total, but not primitive recursive.

There do exist formalisations of total functions which include the Ackermann function, but even these omit some total functions: a formalisation that could define any total recursive function in an effectively calculable way would contradict the universal halting problem[link]. So there's nothing we can do.

## The Ackermann function

Define the __Ackermann function__ $A : \N^2 \to \N$ as follows:

$$\begin{aligned}
A(0,n)&=n+1\\
A(m+1,0)&=A(m,1)\\
A(m+1,n+1)&=A(m,A(m+1,n))
\end{aligned}$$

The evaluation of $A(x,y)$ always terminates since in each recursive call to $A$, the argument pair decreases lexicographically&mdash;either $x$ decreases, or $x$ stays the same and $y$ decreases&mdash;and there is a least pair $A(0,0)$.

This function grows astonishingly quickly: for example, $A(3,2) = 29$, but $A(4,3) = 2^{2^{65536}} - 3$.

It turns out that $A$ is not primitive recursive: it grows faster than any primitive recursive function. We can show this by showing that the set of functions growing strictly slower than $A$, given by

$$
\mathcal{X} = \{ f^n \mid n \in \N  \land \exists t\, \forall x_1\cdots \forall x_n \, f(x_1,\ldots,x_n) < A(t, \max_i x_i) \}
$$

satisfies $\text{PR} \subseteq \mathcal{X}$. (If $A \in \mathcal{X}$ then $A(t,t) < A(t,t)$ which is absurd.)

### Proof


## Isabelle

**Isabelle** is a theorem prover designed by Lawrence Paulson and developed by researchers at the University of Cambridge and the Technical University of Munich.

It was a pleasant surprise to see Lawrence Paulson's name again. I first encountered him at university when he lectured an undergraduate course on logic and proof. It is difficult not to read his online written material in his irreverent tone of voice.

I have never used Isabelle or a theorem prover before, so it took a while to get used to.

## Primitive recursive functions again

We can define the Ackermann function simply as

```isabelle
fun ack :: "nat ⇒ nat ⇒ nat" where
  "ack 0 n             = Suc n"
| "ack (Suc m) 0       = ack m 1"
| "ack (Suc m) (Suc n) = ack m (ack (Suc m) n)"
```

In modelling primitive recursive functions, we come against a problem in that dealing with function arity is a pain. However, we can get around this by characterising functions as functions `f :: nat list ⇒ nat` of a finite lists of arguments. Absent arguments (if the list isn't long enough) can be simply set to `0`.

This seems to me like much more than just a clever encoding trick; this strikes me like a significantly more elegant and easy-to-use characterisation of these recursive functions, one which was not at all obvious from the above mathematical definition perhaps in large part due to the poverty of notation pure mathematics has for cons-lists. More on this later.

```isabelle
fun nth :: "nat ⇒ nat list ⇒ nat" where
  "nth n xs = case (drop n xs) of
    [] -> 0
    x#_ -> x
  "

type Func = "nat list ⇒ nat"

definition ZERO :: Func
  where "ZERO _ = 0"

definition SUCC :: Func
  where "SUCC xs = Suc (nth 0 xs)"

definition PROJ :: "nat ⇒ Func"
  where "PROJ i = nth i"

definition COMP :: "Func ⇒ Func list ⇒ Func"
  where "COMP h gs xs = h (map (λg. g xs) gs)"

definition PREC :: "Func ⇒ Func ⇒ Func"
  where "PREC g h xs = case (nth 0 xs) of
  0 -> g xs
  Suc y -> h (y # PREC g h (y # tail xs) # xs)

!use headtail
  (0, _) -> g xs
  (Suc y, ys) -> h (y # PREC g h (y # ys) # ys)
  "
```


### The primitive recursive functions

Programs in $Q$ are somewhat annoying to deal with, so it will be easier to deal with an equivalent characterisation of $Q$: the _primitive recursive functions_.[cite equivalence paper Meyer, Albert R.; Ritchie, Dennis MacAlistair (1967). The complexity of loop programs.]

Define $\operatorname{head}_0 : \N \text{ list} \to \N$ as follows:

$$
\operatorname{head}_0\,\mathit{xs} = \begin{cases}
0 & \mathit{xs} = [] \\
y & \mathit{xs} = y :: \mathit{ys}
\end{cases}
$$

The primitive recursive functions $p : \N \text{ list} \to \N$ are defined inductively as follows:

- $\operatorname{zero}(\mathit{xs}) = 0$
- $\operatorname{succ}(\mathit{xs}) = \operatorname{head}_0(\mathit{xs})+1$
- $\operatorname{proj}_i(\mathit{xs}) =$

Define the set `PRIM` as those functions `eval p :: [Nat] → Nat` for some `p :: PrimRec`.

```haskell
data Nat = Z | S Nat

data PrimRec =
    Zero
  | Succ
  | Proj Nat
  | Comp PrimRec [PrimRec]
  | Recur PrimRec Primrec

head :: [Nat] → Nat
head xs = case xs of
  []  → Z
  x:_ → x

eval :: PrimRec → [Nat] → Nat
eval primrec xs = case primrec of
    Zero → Z
    Succ → S (head xs)
    Proj i → head (drop i xs)
    Comp h gs → eval h (map (\g → eval g xs) gs)
    Recur g h → case head xs of
      Z → eval g xs
      S y → eval h (y:(eval (y:xs)):xs)
```



### the Ackermann function



Let $f^k$ denote a function with arity $k$.

Let $\mathbf{x}^{(k)}$ denote $x_1,\ldots,x_k$.


$$
\mathbf{\hat{x}}^{(k)} = \begin{cases}
0 & k = 0 \\
\max_i x_i & k > 0
\end{cases}
$$

Primitive recursive functions are defined as:

1. Zero function: $z^0 = 0$
2. Successor function: $s^1(x) = x+1$
3. Projection functions for $k,i \in \N, 1 \leq i \leq k$: $\pi^k_i(x_1,\ldots,x_k) = x_i$

Given $h^m$ and $g_1^k,\ldots,g_m^k$, define their composition $h \circ (g_1,\ldots,g_m)$ as $f^k$ such that

$$
f(\mathbf{x}) = h(g_1(\mathbf{x}),\ldots,g_m(\mathbf{x}))
$$

Given $g^k$ and $h^{k+2}$, define their primitive recursion $\rho(g,h)$ as $f^{k+1}$ such that

$$\begin{aligned}
f(0,\mathbf{x}) &= g(\mathbf{x}) \\
f(S(y),\mathbf{x}) &= h(y,f(y,\mathbf{x}),\mathbf{x})\\
\end{aligned}$$

This encodes for loops.

The question is, does this encapsulate all total effectively procedures? The answer is no. 

### Theorem

$A \notin \text{PRIM}$.

### Proof

Define $\mathcal{X}$ as the set of functions of any arity which grow strictly slower than $A$ in the following sense:

$$
\mathcal{X} = \{ f^n \mid n \in \N  \land \exists t\, \forall x_1\cdots \forall x_n \, f(x_1,\ldots,x_n) < A(t, \max_i x_i) \}\text{.}
$$

It suffices to show that $\text{PRIM} \subseteq \mathcal{X}$, since if $A \in \mathcal{X}$ then $A(t,t) < A(t,t)$ which is absurd.

### Lemma

For all $k,i$ with $1 \leq i \leq k$,

- $z \in \mathcal{X}$;
- $S \in \mathcal{X}$;
- $\pi^k_i \in \mathcal{X}$.

asdf

- For $z$, we have $0 = z < A(0,0) = 1$.
- For $s$, we have $x+1 < A(1,x) = A(0,x+1) = x+2$.
- For $\pi^k_i$, we have $x_i =\pi^k_i(\mathbf{x}) \leq \mathbf{\hat{x}} < A(0,\mathbf{\hat{x}}) = \mathbf{\hat{x}} + 1$.

Stuff

Given $h^m,g^k_1,\ldots,g^k_m \in \mathcal{X}$, let $f^k = h \circ (g_1,\ldots,g_m)$.

There exist $s,r_1,\ldots,r_m$ with $h^m(\mathbf{y}) < A(s,\mathbf{\hat{y}})$ and $g^k_i(\mathbf{x}) < A(r_i,\mathbf{\hat{x}})$.

Let $\mathbf{x}$.

Let $\mathbf{g} = \langle g_1(\mathbf{x}),\ldots,g_m(\mathbf{x})\rangle$.

$$
f(\mathbf{x}) < A(s, g_j(\mathbf{x})) < A(s,A(r_j,\hat{x}))
$$

## Thoughts

The limitations of mathematical notation and its traditional usage made it difficult to see a streamlining of the formalisation: replacing function arity book-keeping with functional programming-style lists of arguments, eliminating the concomitant range restrictions on projection functions using a default value of $0$. We lack good primitives for expressing FP lists in pure mathematical notation, so we either struggle to conceive of applying them to a problem in the first place or write pseudo-ML code, notation itself significantly impoverished by layout restrictions imposed by historical computer terminals (restrictions which haunt all programming languages to the present day) and the technical limitations of LaTeX.

Isabelle is fun to use; it feels very powerful, more powerful than I understand. I feel like I understand very little of it so far. The interface is questionable, but that can be forgiven.