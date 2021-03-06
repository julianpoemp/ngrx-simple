# ngrx-simple <a href="https://www.npmjs.com/package/ngrx-simple"><img alt="npm" src="https://img.shields.io/npm/v/ngrx-simple"></a>

Library that simplifies developing with ngrx.

## Features

- Group and simplify action creation

## Why?

Creating actions with Ngrx is very repetitive: The most of the time you need an action and for this action you need an
action when it succeeds or when it fails.

Example: Creating actions for clicking on a button the normal way with creator functions:

````typescript
export const clickButton = createAction("[button] click do", props<TestProps>());
export const clickButtonSuccess = createAction("[button] click success", props<TestProps>());
export const clickButtonFail = createAction("[button] click fail", props<TestProps>());
````

After that you would use these actions in another class, for example:

````typescript
import * as fromButtonActions from "./button.actions";

...
this.store.dispatch(fromButtonActions.clickButton({
  test: "ok"
}));
...
````

As you can see there are following problems:

- The three actions are not grouped together, but they should be considered as group.
- The scope ("[button]") and the label ("do", "success", "fail") have to be repeated each time you have to declare a new
  group of actions.
- You have to write down a custom import in order to use the actions (
  see `import * as fromButtonActions from "./button.actions";`)

### What about createActionGroup()?

ngrx offers a method called createActionGroup. That would allow to write less repetitive code but it's far from perfect. For example:

```typescript
import {createActionGroup} from "@ngrx/store";

export const click = createActionGroup({
  source: 'button/click',
  events: {
      do: props<TestProps>(),
      success: props<TestProps>(),
      fail: props<TestProps>()
  }
});
```
As you can see, you still have to repeat the scope "button" on each action group. Think about having a lot of action groups and you want to change the scope. You would have to replace it everywhere instead of just changing a scope attribute.


ngrx-simple tries to solve these issues.

## Example of action creation with ngrx-simple

You can create a group of actions easy using:

```typescript
import {SimpleActions} from "ngrx-simple";

public class ButtonActions extends SimpleActions {
  scope: "button"
  
  public static click = ((label: string, scope: string) => ({
    do: this.doP(scope, label, props<TestProps>()),
    success: this.successP(scope, label, props<TestProps>()),
    fail: this.fail(scope, label)
  }))("click", this.scope);
}
```

Then you can use the actions with the help of the auto-import feature of your IDE:

````typescript
import ButtonActions from "./button.actions";

...
this.store.dispatch(ButtonActions.click.do({
  test: "ok"
}));
...
````
This action is going to be of type `[button/click] do` automatically.

### Methods

There are currently three types of methods: `do`, `success` and `fail`. For each method there are two methods: one method
with properties (e.g. `doP`) and one without properties (`do`).

### Contributing

Feel free to contribute! :) If you find more ways to simplify ngrx, I'm really looking forward to better solutions. Just fork this repository and create a pull request.

If we find a way to reduce more repetitive code, it would be awesome. Especially the action creations should be optimized much more:

```typescript
public static click = ((label: string, scope: string) => ({
    do: this.doP(scope, label, props<TestProps>()),
    success: this.successP(scope, label, props<TestProps>()),
    fail: this.fail(scope, label)
  }))("click", this.scope);
```
should be simplified to somoething like this:
```typescript
public static click = generate("click", {
    do: props<TestProps>(),
    success: emptyProps(),
    fail: props<TestProps>()
});
```

