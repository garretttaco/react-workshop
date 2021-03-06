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


**Important reminder**: Child components do not know anything about their parents but the parents know everything about the children. They can read their props, add new props, clone them, etc.

**Q:** When opting into a parent context, it will fetch the context value of the nearest parent that has that context type.
Does React consider the PropType declared when making the decision of what context to grab?
**A:** Keys will always overwrite keys, no matter the prop type.

## Higher-order components
It all started with the createClass API. If you wanted to share code, you would use mixins.
Then React started favoring es6 classes because they did not want to keep maintaining createClass. You now just use a native JavaScript class and just extend the React.Component class.
But es6 classes do not support mixins, so we cannot use those anymore. So, how do we share code?
Sebastian Markbage proposed a pattern, back in 2015, to have a function that takes a component, then adds the boilerplate to the passes component and then it returns that same component with the added functionality.
We can now decorate our class with functionality.

### Upsides
- The main upside to an HoC is that you can just import it, wrap it around your component and boom, you’re done. 
This however can be a downside because if the HoC needs to re render, it will result render the whole wrapped component vs just re-rendering the section of Jsx that the render prop callback is defined in. 

### Caveats  
- When exporting a component that is wrapped with a higher order component, you have to be sure to pass along all the props to the decorated component.
- When looking in the devTools, the tree can get really messy and the hierarchy can get deep and hard to understand.
- Higher-order components can override props. This can be hard to track down, especially if you have multiple HoCs wrapping your components.
- There is indirection as to where the props are coming from, which mixins suffered from with state. Instead of mixing the code in with our class we are decorating it.
- The higher-order component is defined statically.
- You have to remember to pass the props.
- The render method becomes imperative again. It is hard to tell what is going on at first glance. You have to go looking around to find out what is really happening.
- The component that is wrapping the passed in component and has to do some work to act like that other component.
- Every time you want to use an HoC, you have to create a new Component so to speak, eg: AppWithMouse, ExampleWithMouse, SomethingElseWithMouse.

## Render props
- Your render method becomes declarative again. You don't have to guess where these mysterious props are coming from. It can be tedious to follow them up the HoC tree if you have a lot of decorations.
- The reason we don't call this "render callback" is because this already has a specific meaning for async things and event handling.
We call it a render prop because it is just that, a prop that we are rendering.
- Everyone knows how to compose functions but why not compose with Components?
- Any HoC EVER WRITTEN can be written with a render prop. The inverse is not true.
- Provides dynamic composition.
- This lets you compose ANYTHING! You can compose state.

## Routing
- When redirecting to a login page, clicking the back button after login should not redirect you to the login page, it should bring you back to the original url you were on before the redirect to login.

## Performance
- In React we need to profile our code. We can't just look at it and say oh you can't declare an anonymous function in the render method because it is a performance issue.
- Use unique keys to avoid re-rendering items in an array if the contents didn't change. 
- Make use of shouldComponentUpdate based on the props passed in and used. This will help React's reconciler decide if it needs to update that component instance .
- Only render what is needed for the view port for large lists of render extensive items. If you want to have a reusable way to do this, react-virtualized is a good library to do this for you.

