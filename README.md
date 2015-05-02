# node-backcall
Turns `fn(..., cb)` into `fn(cb, ...)`.

## Why?

Here's why:

```coffeescript
someFn = (cb) ->
  async.rwaterfall cb, [
    (cb) -> fn1 cb
    (cb) -> fn2 cb
  ]
```

is prettier than

```coffeescript
someFn = (cb) ->
  async.waterfall [
    (cb) -> fn1 cb
    (cb) -> fn2 cb
  ], cb
```

for methods that take callbacks.

It's minor, but it's a nuisance.
