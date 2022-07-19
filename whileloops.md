## While loops are necessary, or why not all total functions are primitive recursive

Suppose we define a simple programming language $Q$ as follows[1]. We have an infinite set of variables $\{ x_0,x_1,\ldots\}$.

$$\begin{aligned}
P ::= \, \, &x_i := 0 \\
\mid\,\,\,\,\, &x_i := x_i + 1 \\
\mid\,\,\,\,\, &P; P \\
\mid\,\,\,\,\, &\operatorname{repeat}(x_i,P)
\end{aligned}$$

The form $\operatorname{repeat}(x_i,P)$ means to repeat the subprogram $P$ $x_i$ times. The number of iterations is set at the start of the loop and unaffected by changes to $x_i$ in $P$.

At the start of execution, variables $x_1,\ldots,x_k$ for some $k$ are initialised in $\N$ as arguments to $P$, while the rest $x_0,x_{k+1},x_{k+2},\ldots$. are initialised to $0$. The result of $P$'s execution is taken as the value of $x_0$ upon termination.

This way, programs $P$ define functions $\hat{P} : \N \text{ list} \to \N$, where $\N \text{ list}$ denotes a finite list of natural numbers. $\hat{P}$ is always defined for any input; there is no way to write an infinite loop in $Q$, so all programs terminate for all inputs. We call a program _total_ if it terminates for all inputs.

Although $Q$ seems extremely limited, it is actually extremely powerful. Using the simple constructs available to us, we can define if statements and any number of numerical functions like $+$, $\times$, and so on. Our only real limitation is the inability to loop an unknown number of times; all loops must state a finite number of repetitions up front. We cannot naïvely express a program like

```
while x_0 > 1 {
    x_0 = match x_0 % 2 {
        0 => x_0 / 2,
        1 => 3*x_0 + 1,
    };
}
```

in $Q$.

An interesting question to ask is: can all total functions $f : \N \text{ list} \to \N$ be written in $Q$? Or are there programs cannot be expressed in $Q$, even though they always terminate?

It turns out the answer is no; there are always-terminating programs that cannot be written in $Q$. One way of saying this is that you need while loops (or recursion, $\mu$-minimisation, or any other equivalent characterisation).