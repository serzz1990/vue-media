[matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

```Javascript
$matchMedia.setBreakpoints({
    xs: 360,
    sm: 568,
    md: 784,
    lg: 960
})

$matchMedia('(min-width: 569px)')

$matchMedia.down.sm()
$matchMedia.down('sm')
$matchMedia.down(1000)

$matchMedia.max(1000)
$matchMedia.max('sm')
$matchMedia.min('sm')
$matchMedia.min.sm()
```
