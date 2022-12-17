# On intuition and rigour (featuring the Cantor&ndash;Schröder&ndash;Bernstein theorem)

TODO: fill this description part out.

## Statement 1

**Theorem.** If there exist injective functions $f : A \to B$ and $g : B \to A$ for sets $A$ and $B$, there exists a bijection $h : A \to B$.

**Proof.** Recall that $f$ being injective means that $f(a_1)=f(a_2) \implies a_1=a_2$. Hence $f$ has a partial inverse function $f^{-1} : B \rightharpoonup A$.

Assume without loss of generality that $A$ and $B$ are disjoint. For each $a$ in $A$ define the sequence $s_a$ as

$$
\cdots \;\;\;\;\;\
 f^{-1}g^{-1}(a) \;\;\;\;\;\
 g^{-1}(a)\;\;\;\;\;\
 a\;\;\;\;\;\
  f(a)\;\;\;\;\;\
 gf(a)\;\;\;\;\;\
 fgf(a)\;\;\;\;\;\
 \cdots
$$

which may terminate to the left at some $\ell_a\in A \sqcup B$ on which neither $f^{-1}$ nor $g^{-1}$ are defined. Since the sequences $s_a$ partition $A \sqcup B$, it suffices to consider the elements within each sequence individually.

For each sequence $s_a$, if $\ell_a \in A$ then $f^{-1}$ is total on $B$-elements of $s_a$; if $\ell_a \in B$ then $g^{-1}$ is total on $A$-elements of $s_a$; and if $\ell_a$ is undefined, both $f^{-1}$ and $g^{-1}$ are total on their respective halves of $s_a$. Hence at least one of $f$ and $g$ is bijective for every sequence $s_a$. $\square$

## Statement 2

**Question.** We have a (potentially infinite) set of red and black counters[1] with arrows pointing between them such that every black has exactly one arrow pointing from it to a red, and every red has exactly one arrow pointing from it to a black. No two arrows point at the same counter. Show that the black counters and red counters can be put in one-to-one correspondence with one another.

**Answer.** For any black counter, follow the chain of arrows both forwards and backwards from it. (By assumption there are either zero or one arrows pointing at any given counter, so there is no ambiguity in going backwards.) The counter in each chain alternate between black and red.

Every counter is in exactly one such chain (every counter is in a chain because every counter has exactly one arrow pointing away from it; no counter can be in two chains, because it would need two arrows both either pointing away from or toward it). Therefore we can put the counters in one-to-one correspondence by putting the counters within each chain in one-to-one correspondence, then combining all the chains together.

Consider a single chain $C$. We either have some starting counter $s$ which has no arrow pointing at it, or following the arrows backwards never ends.

- If $s$ exists and is black, then not every black in $C$ has a red behind it (because $s$ doesn&#8217;t), but every red in $C$ does have a black behind it.
- If $s$ exists and is red, then not every red in $C$ has a black behind it (because $s$ doesn&#8217;t), but every black in $C$ does have a red behind it.
- If $s$ doesn&#8217;t exist, then both colours always have a counter of the opposite colour behind them.

Therefore we can put the red and black counters in $C$ in one-to-one correspondence by taking the colour opposite to $s$ (or either colour if $s$ doesn&#8217;t exist) and putting it next to the counter behind it.

## Some thoughts about this

The proof with arrows seems to me to be easier to grasp intuitively, especially to those with less mathematical background. I think someone with no maths knowledge at all could understand the second proof.

One of the downsides of the proof with arrows is that the mental image of arrows drawn between opposing columns of circles makes assumptions that aren&#8217;t in the condition. We can only draw finitely many circles and arrows, but our sets can be infinitely large (and have to be for this statement to not be completely trivial). Adding ellipses $\cdots$ to our circles and arrows doesn&#8217;t help either; we&#8217;re assuming the infinities are countable. While it&#8217;s true that that assumption doesn&#8217;t matter here, there are many problems where hidden assumptions like this cause headaches, like in this infamous proof that [all triangles are equilateral](http://jdh.hamkins.org/all-triangles-are-isosceles/).

Much has been written about the importance of both intuition and formal reasoning in maths and how with practice we can develop a more rigorous intuition. Though this is a fine sentiment, what concerns me is what strike me as fundamental limitations of unifying the two. To take visualisation as an example, if we allow the following:

- Any visual conception of all of the elements of a set at once must by definition assume countability.
- There exists a mathematical problem $\mathcal{M}$[3] such that:
  - $\mathcal{M}$ deals with some general set $X$ that may be uncountable;
  - visualising all the elements of $X$ at once makes it strictly easier for us to think about $\mathcal{M}$ than intuition-about-formal-reasoning alone;
  - In the process of solving $\mathcal{M}$ we are likely to encounter some useful proposition, true for countable sets, false in general, for which the only way to avoid errors in reasoning is to drop that visualisation.

then it is implied that we must do both intuition and formal reasoning separately if we want to both effective and correct. I find this slightly disquieting because I&#8217;m sympathetic to the idea that we can reinstate our best intuitions on a foundation of rigour and treat them as one, and it seems to be a common idea. This argument would appear to show that in some cases we have no choice but to rely on demonstrably wrong intuitions to solve some problems as effectively as we can, and these intuitions provably can&#8217;t be patched up or suitably replaced, ever. (I have a feeling that physicist friends will tell me they knew this from the beginning&#8230;) But if this is obvious, does it apply to certain fields or problems more than others? Are some problems free of this?

On a separate note, I&#8217;m not sure there is one best way to state the original problem. The statement about injective functions requires a mathematical background, but is concise and makes the theory easier to leverage. The statement about counters and arrows requires no background at all and is so useful that I would give it with any demonstration just for clarity, but has the aforementioned problem with infinities and requires more reading and thought to piece together the translation of injectivity and bijectivity to conditions on arrows. (I&#8217;m reminded of the word problems in maths and computer science contests.)

It&#8217;s worth noting that the counters-and-arrows proof is rigorous. I think there&#8217;s an unjust trend of calling reasoning with household objects or shapes etc. unrigorous, though happily there are plenty of examples to the contrary such as the [stars and bars](https://en.wikipedia.org/wiki/Stars_and_bars_(combinatorics)) method.

[1] More precisely: we have a very, very large number of counters (let&#8217;s not consider how many). Some may be black, some may be red, some may be both red and black. (There may be infinitely many of any or all of these categories, and some of those infinities might be bigger than others&#8230;) The proof would then say &ldquo;Let&#8217;s not worry about a counter being both red and black, because the argument is just as valid if there aren&#8217;t any&rdquo;, and it would be right. It wouldn&#8217;t bother mentioning the blue counters, because they&#8217;re irrelevant (unless they are red or black as well).

[3] The original problem was a poor example of this because the erroneous assumption never mattered. As for more suitable ones? I donno.