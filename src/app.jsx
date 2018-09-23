import xs from 'xstream';
import dropRepeats from 'xstream/extra/dropRepeats'
import {$put} from 'cycle-idb';

function intent(domSources) {
  return domSources.select('.name')
    .events('input')
    .map(ev => ev.target.value);
};

function model(input$, db$) {
  const log$ = db$;
  return xs.combine(input$, log$)
    .map(([input, logs]) => {
      console.log('input in model ', input);
      console.log('log in model ', logs);
      return {
        id: 1,
        name: input,
      }
    }).startWith({id: 1, name: ""});
};

function view(state$) {
  return state$.map(log => {
    console.log('log in view', log);
    return (
      <div>
        <label for='name'>Name: </label>
        <input 
          className='name' 
          type='text' 
          // value={log.name}
          placeholder="Enter a log name"
        />
        <p>{log.name}</p>
      </div>
    )
  });
};

function persist(state$) {
  return state$.compose(dropRepeats((x, y) => {
    return x.id === y.id && x.name === y.name;
  })).map(log => {
    console.log('log in persist: ', log);
    return $put('logs', log)
  });
};

export function App (sources) {
  const db$ = sources.IDB.store('logs').getAll();
  const input$ = intent(sources.DOM);
  const state$ = model(input$, db$);
  const vtree$ = view(state$);
  const updateDb$ = persist(state$);
  
  const sinks = {
    DOM: vtree$,
    IDB: updateDb$,
    // logger: state$
  };
  
  return sinks;
}
