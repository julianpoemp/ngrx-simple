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

These issues are solved in ngrx-simple.

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
this.store.dispatch(fromButtonActions.click.do({
  test: "ok"
}));
...
````
This action is going to be of type `[button/click] do` automatically.

### Methods

There are currently three types of methods: `do`, `success` and `fail`. For each method there are two methods: one method
with properties (e.g. `doP`) and one without properties (`do`).

### Contributons

Feel free to contribute! :) If you find more ways to simplify ngrx, I'm really looking forward to better solutions. Just fork this repository and create a pull request.
