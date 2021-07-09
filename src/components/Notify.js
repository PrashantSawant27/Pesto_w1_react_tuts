const Notify=(props)=>
{
  return <h3  className="text-left" dangerouslySetInnerHTML={{__html: props.msg}}></h3>;
}
  
export default Notify;