# Vivecard Component



## template

I'm using pug a.k.a. jade template engine for my template part of component.
`:style` is used because this element has a computed class


```jade
div.content
  div#front(:style="style")
    div.hr
      div.txt
        h1 Leszek Stęczniewski
        h2 l.steczniewski (at) gmail.com
```

## script

### Es6

Es6 syntax for script part of this component

### rxjs

From rxjs package I'm importing main observable with map, throttleTime operators.
I need fromEvent method to create observable from mouse move events.

```javascript
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/throttleTime'
```

When component is inserted into dom I register observable and subscribe to it.
Runing throttleTime on observable limits further executions to minimum 100ms pace.

```javascript
Observable.fromEvent(window, 'mousemove')
  .throttleTime(100)
```

I'm mapping each event end extract mouse x and y cords as percents from middle of component

```javascript
.map(event => ({
  x: event.pageX / window.innerWidth * 2
  ,y: event.pageY / window.innerHeight * 2
}))
.map(p => ({
  x: p.x * this.maxx - this.maxx
,y: p.y * this.maxy - this.maxy
}))
```

Now when I subscribe, I will get just x and y percents witch will
not exceeds maximum values

After destroyed I unsubscribe.




Full script bellow

```javascript
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/throttleTime'

export default {
  name: 'vivecard'
  ,data: () => ({
    movex: 0
    ,movey: 0
    ,maxx: 45
    ,maxy: 45
  })
  ,computed:{
    style: function(){

      let f = Math.max(Math.abs(this.movex), Math.abs(this.movey))
      f = Math.pow(f, 1.2)

      return `box-shadow: ${this.movex}px ${this.movey}px ${f}px #93c54b;`
    }
  }
  ,mounted: function() {

    let mp = Observable.fromEvent(window, 'mousemove')
     .throttleTime(100)
     .map(event => ({
       x: event.pageX / window.innerWidth * 2
       ,y: event.pageY / window.innerHeight * 2
     }))
     .map(p => ({
       x: p.x * this.maxx - this.maxx
      ,y: p.y * this.maxy - this.maxy
     }))


    this.mp = mp.subscribe(
      r => {
        this.movex = r.x * -1
        this.movey = r.y * -1
      }
    )


  }
  ,destroyed: function(){
   this.mp.unsubscribe()
  }
}
```


## style

I'm using sass for styles with scoped tag to limit styles for this component
only

```sass
.content{
  height: 100%;
  position: relative;
  display: flex;
  align-content: center;
  justify-content: center;
}
#front{
  font-size: 1.3em;
  color: #fafafa;
  transform-style: preserve-3d;
  transition-duration: .1s;
  margin: auto;
  background-color: #3e3f3a;
  border-radius: 1%;
  width: 500px;
  height: 260px;
  padding: 30px;
}

.txt{
  position: relative;
  top: 15px;
  }

.hr{
  position: absolute;
  left: 0;
  top: 30px;
  border-top: 3px solid #29abe0;
  width: 100%;
  }

h1, h2{
  text-align: center;
}

h2{
  color: #f8f5f0;
}


```

Literature
- [Vue components](https://vuejs.org/v2/guide/components.html#ad)
- [Single File Components](https://vuejs.org/v2/guide/single-file-components.html#ad)
- [Sass](http://sass-lang.com/)
- [Pug](https://pugjs.org)
- [Reactive extensions](https://github.com/Reactive-Extensions/RxJS)