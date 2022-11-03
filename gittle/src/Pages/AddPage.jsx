import {useLocation} from 'react-router-dom'


function AddPage() {
  const location=useLocation()
  return (
    <div>
      <p>add</p>
      {location.state.root}
    </div>
  );
}

export default AddPage;
