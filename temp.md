❌ Bad Code:\n`javascript\nfunction
sum() { return a + b;}\n`\n\n🔍 Issues:\n* ❌ The function `sum` does not declare or define the variables `a` and `b`.
This will lead to an error (or unexpected results if `a` and `b` are defined in an outer scope).\n* ❌ The function lacks
parameters, making it inflexible and tightly coupled to variables outside its scope.\n\n✅ Recommended
Fix:\n\n`javascript\nfunction sum(a, b) {\n return a + b;\n}\n`\n\n💡 Improvements:\n\n* ✔️ **Explicit Parameters:**
The `sum` function now accepts `a` and `b` as parameters. This makes the function reusable with any two numbers.\n* ✔️
**Clear Scope:** The function now operates on its input parameters, avoiding reliance on external variables and making
its behavior predictable.\n\nFinal Note:\n\nAlways define variables within the scope where they are used. Avoid implicit
dependencies on variables declared outside of the function as this makes the code harder to understand, debug, and
maintain. In this case, explicitly passing the numbers to be summed as parameters is the correct approach.\n
