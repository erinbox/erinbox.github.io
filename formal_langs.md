# Formal languages

The theory of formal languages has many applications in computer science and programming.

## Introduction

### Strings

- Let $\Sigma$ be a finite set called an **alphabet**.
- A **string** $s$ over $\Sigma$ is a finite sequence of elements from $\Sigma$. The length of $s$ is denoted $|s|$.
- The **empty string** is the unique string of length $0$ and is denoted $\varepsilon$.
- The **concatenation** of strings $s,t$ is the string formed of the characters in $s$ followed by the characters in $t$, denoted $st$.
- The set of all strings over $\Sigma$ is denoted $\Sigma^\ast$ (the Kleene star operation). Formally, for a set $V$, define
  - $V^0 = \{ \varepsilon \}$
  - $V^{i+1} = \{ wv \mid w \in V^i, v \in V\}$
  - $V^\ast = \bigcup_{n\in\N} V^n$

### Formal languages

- A __formal language__ $L$ over an alphabet $\Sigma$ is a subset $L \subseteq \Sigma^\ast$.
- The concatenation of languages $L,M \subseteq \Sigma^\ast$ is given by $\{ lm \mid l \in L, m \in M\}$.
- Given a language $L$, the Kleene star $L^\ast$ is the set of strings which are the concatenation of some number of strings in $L$, consistent with the formal definition above.

## Regular languages

### Definition and regular expressions

The set of **regular languages** over $\Sigma$ is defined inductively as follows:

- The empty language $\emptyset$ is a regular language.
- For each $a \in \Sigma$, the singleton language $\{ a \}$ is a regular language.
- Given a regular language $R$, $R^\ast$ (Kleene star) is a regular language.
- Given regular languages $R$ and $S$, $R \cup S$ (union) and $RS$ (concatenation) are regular languages.

Given this definition, regular languages can be expressed using **regular expressions**: a straightforward l

Note that some popular regular expression engines used in programming have additional features, such as backreferences, which make them no longer represent the regular languages.

Is every language regular? The answer is no: for non-trivial $\Sigma$ there are countably infinite regular languages over $\Sigma$, but there uncountably infinite languages over $\Sigma$ in general. But there are fairly prosaic examples of non-regular languages. For example, the language $\{ a^nb^n \mid n \in \N \}$ over $\Sigma = \{ a,b\}$ is not regular, as will be proved later.

Regular expressions are widely used in programming languages, text editors, and search tools.

### Deterministic finite automata

A **deterministic finite automaton** or DFA is a simple model of a machine. Formally, $M$ is a $5$-tuple $(Q, \Sigma, \delta, q_0, F)$, consisting of

- A finite set of states $Q$
- A finite alphabet $\Sigma$
- A transition function $\delta : Q \times \Sigma \to Q$
- An initial state $q_0 \in Q$
- A set of accepting states $F \subseteq Q$

A string $w = a_1a_2\cdots a_n$ in $\Sigma^\ast$ is **recognized** by $M$ iff there is a sequence of states $r_0,\ldots,r_n$ such that

- $r_0 = q_0$
- $r_{i+1} = \delta(r_i,a_i)$ for $0 \leq i < n$
- $r_n \in F$.

In other words, the machine starts in the initial state, treats $w$ as a sequence of instructions, and says &ldquo;accept&rdquo; if it ends up in an accepting state and &ldquo;reject&rdquo; otherwise.

[Graphical representation]

The set of strings recognized by $M$ is called the **language recognized by $M$**, denoted $L(M)$.

It turns out that a language $L$ over $\Sigma$ is regular if and only if there exists a DFA $M$ which recognizes exactly $L$. This will be proved in a bit.

### Non-deterministic finite automata

An **non-deterministic finite automaton** or NFA$_\varepsilon$ is a DFA $M$ except that the transition function $\delta: Q \times \Sigma \to Q$ is replaced with a transition function $\Delta : Q \times (\Sigma \cup \varepsilon) \to \mathcal{P}(Q)$. In words, for any state $q$ and character $a$, $M$ may have transitions to any number of states $q'$, including none at all. Additionally, there are $\varepsilon$-transitions which $M$ may take without consuming a character from the input word $w$.

Analogous to the above, a word $w$ is accepted by an NFA$_\varepsilon$ $M$ if and only if there exists a sequence of states with labelled transitions between them such that

- the final state is an accepting state
- the labelled transitions, concatenated, spell out $w$.

TODO: q ->u q'

NFAs, despite possessing more constructs than DFAs, are in fact equal in expressive power, as can be shown via the **powerset construction** outlined below. However, the minimal DFA corresponding to an NFA may still have exponentially more states than the equivalent NFA.

### The powerset construction

**Theorem.** For any NFA $M = (Q, \Sigma, \Delta, q_0, F)$, there exists a DFA $M' = (\mathcal{P}(Q), \Sigma, \delta, q_0', F')$ with $L(M)=L(M')$.

**Proof.** Given such an $M$, define $M'$ as above with

- $\delta(S,a) = \{ q' \in Q \mid \exists q \in S.\, q \xRightarrow{a} q' \}$
- $q_0' = \{ q' \in Q \mid q_0 \xRightarrow{\varepsilon} q'\}$
- $F' = \{ S \in \mathcal{P}(Q) \mid F \cap S \neq \emptyset\}$.

Then a word $w = a_1\cdots a_n$ is in $L(M)$ if and only if there exists $q_1,\ldots,q_n \in Q$ such that

$$
q_0 \xRightarrow{a_1} q_1 \xRightarrow{a_2} \cdots \xRightarrow{a_n} q_n \in F\text{.}
$$

Since $M'$ is a DFA, there exist $S_1,\ldots,S_n \in \mathcal{P}(Q)$ such that

$$
q_0' \xrightarrow{a_1} S_1 \xrightarrow{a_2} \cdots \xrightarrow{a_n} S_n
$$

where $S_1 = \delta(q_0', a_1)$, $S_2 = \delta(S_1, a_2)$, etc. By definition of $\delta$, each $q_{i+1} \in \delta(S_i, a_{i+1}) = S_{i+1}$, so in particular $q_n \in S_n$. Therefore $q_n \in S_n \cap F$, so $S_n \in F'$ and $w \in L(M')$.

### Kleene&#8217;s theorem

### Closure properties of regular languages

### The pumping lemma for regular languages

## Context-free grammars

A __context-free grammar__ or CFG $G$ is a $4$-tuple $(V,\Sigma, R, S)$ where

- $V$ is a finite set of __nonterminals__.
- $\Sigma$ is a finite set of __terminals__ disjoint from $V$, i.e. the alphabet.
- $R$ is a finite relation in $V \times (V \cup \Sigma)^\ast$ whose members are called __production rules__.
- $S \in V$ is the __start symbol__, representing the entire sentence.

Production rules $(\alpha, \beta) \in R$ are often notated as $\alpha \to \beta$. Furthermore, for each $\alpha \in V$, the production rules $(\alpha, \beta_1),\ldots,(\alpha, \beta_n) \in R$ can be written in the form

$$
\alpha \to \beta_1 \mid \cdots \mid \beta_n\text{.}
$$

$$\begin{aligned}
\alpha_1 &\to \beta_{11} \mid \cdots \mid \beta_{1n_1}\\
\alpha_2 &\to \beta_{21} \mid \cdots \mid \beta_{2n_2}\\
&\vdots\\
\alpha_m &\to \beta_{m1} \mid \cdots \mid \beta_{mn_m}
\end{aligned}$$


For strings $u,v \in (V \cup \Sigma)^\ast$, we say $u$ directly yields $v$, denoted $u \Rightarrow v$, if there exists $(\alpha \to \beta) \in R$ and $u_1,u_2 \in (V \cup \Sigma)^\ast$ such that $u = u_1\alpha u_2$ and $v = u_1 \beta u_2$.

Let $\Rightarrow^\ast$ denote the reflexive&ndash;transitive closure of $\Rightarrow$. The **language** of a context-free grammar $G$ is the set

$$
L(G) = \{ w \in \Sigma^\ast \mid S \Rightarrow^\ast w \}
$$

of strings of terminals derivable from the start symbol.

A language $L$ is a **context-free language** if and only if there exists a context-free grammar $G$ with $L = L(G)$.

### Pushdown automata

A **pushdown automaton** or PDA is a generalisation of the finite automata discussed above, augmented with a stack. Formally, a pushdown automaton is a $7$-tuple $M = (Q,\Sigma,\Gamma,\delta,q_0,Z_0, F)$ where

- $Q$ is a finite set of states
- $\Sigma$ is a finite set of input symbols (the alphabet)
- $\Gamma$ is a finite set of stack symbols (the stack alphabet)
- $\delta : Q \times (\Sigma \cup \varepsilon) \times \Gamma \to \mathcal{P}(Q, \Gamma^\ast)$ is the transition function
- $q_0 \in Q$ is the start state
- $Z_0 \in \Gamma$ is the start stack symbol
- $F \subseteq Q$ is the set of final states

Define an **instantaneous description** of $M$ as a $3$-tuple $(p, w, \beta) \in Q \times \Sigma^\ast \times \Gamma^\ast$. Define the **step relation** $\vdash_M$ on instantaneous descriptions as

$$
(q, ax, A\gamma) \vdash_M (q', x, \alpha\gamma)
$$

for all $q,a,A,q',\alpha$ with $(q',\alpha) \in \delta(q,a,A)$, all $x \in \Sigma^\ast$, and all $\gamma \in \Gamma^\ast$.

The language accepted by $M$ is then defined as

$$
L(M) = \{ w \in \Sigma^\ast \mid (q_0, w,Z_0) \vdash_M^\ast (q_f,\varepsilon,\gamma), q_f \in F, \gamma \in \Gamma^\ast\}
$$

where $\vdash_M^\ast$ denotes the reflexive&ndash;transitive closure of $\vdash_M$.

It turns out that pushdown automata recognise exactly the context-free languages. For a given 

In general, pushdown automata are nondeterministic; there may be multiple available transitions in the grammar.