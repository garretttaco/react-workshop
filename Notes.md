# Day one

## Imperative and Declarative
### Imperative
- You can write React in an imperative way, but you are missing out. 
- Top to bottom
- Procedural code
- A cars gas pedal. Go faster, go slower. It is me in control.
- There is a gap between reading the code and actually understanding what is going on.

### Declarative
- A cars cruise control. I tell the car "go 70mph" and it decides how to optimize to maintain that speed. Even up a hill, I don't have to worry about it.
- In the render method, you never specify "put this div in the DOM" it just does it for you.
- We tell the machine, you can do this better than me, you do the optimizations for me. React is cruise control for your user interface. In a list, you don't have to specify to add new items to the list, you just tell react which items are in the list.
- this.setState is the only imperative thing in react.
- If you have a model and you cannot tell is the modal is open or not then it is imperative code. You want to be able to have a conceptual understanding of how things work just by looking at it.


As humans it is easier for us to understand static values or processes vs dynamic. So how can we optimize for that? So we should be able to write our code and by just looking at it, you can know what is going to happen in the dynamic process.
By having declarative code the gap between the static process and the understanding is gone or at least considerably decreased. You are closing the conceptual gap.
**React is giving us cruise control for the DOM.**

### When should I use CWRP vs CDU?
There is a specific use case for CWRP and that is updating state. If we do not need to update any state, but instead do imperative work, e.g.: turn sound on and set the pitch, then we can do that in componentDidUpdate and not have to worry about a re-render.Go

### When should I create a separate component?
Start every React app with a single component. Once you start to feel that you are duplicating things, turn it into its own component. Whenever you need something that has its own state and you need to duplicate them, then they probably do not need to break it out.



## Compound Components
- Compound components allows people to make their own functionality and not have to add all the functionality to the top API.
- 


**Keyword phrases/terms**
- Method signature: the method name and all its parameters.
