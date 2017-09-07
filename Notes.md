# Day one
__**These notes are sloppy and not meant to follow along with the lectures. These are my quickly taken, unedited notes, that I will use to reference in the future.**__
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

**Keyword phrases/terms**
- Method signature: the method name and all its parameters.

## Context
- The parent's context API uses the word child and you can think of it as these are the context types I will give to my children. The children just say context types and it is an opt-in.
When talking about components, it is easier to think about the concepts boiled down as functions first.
Think of contexts as nested functions where if you define a variable in the outer most function, you can access that variable in any of the nested functions inside that top level one. So context is like using closures.
- Contexts are an implicit API.
The problem with context: `shouldComponentUpdate` when returns false is an update blocker. It is your chance to make the decision, this is my time to update and my whole tree to be updated. This is a hook to tweak things and modify what gets updated.
Context is not broken in this case, it is just blocked. We just need to be aware that update blocker will block the children components from getting the new context that was defined after the state change. There is no case of old context and updated context. It is just context so there is no way to check if it changed in the update blocker.
If you run into this case, then this means your app is broken, not context. You either need to not be using context or not using pure components.
To get around this issue, use something like [react-broadcast](https://github.com/reacttraining/react-broadcast).
Thats it. There are 

**Q:** When opting into a parent context, it will fetch the context value of the nearest parent that has that context type.
Does React consider the PropType declared when making the decision of what context to grab?
**A:** Keys will always overwrite keys, no matter the prop type.
