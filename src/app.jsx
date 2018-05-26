import xs from 'xstream'

export function App (sources) {
  const vtree$ = xs.of(
    <div>
      <label for='name'>Name: </label>
      <input className='name' type='text'/>
      <button>Save</button>
    </div>
  )
  const sinks = {
    DOM: vtree$
  }
  return sinks
}
