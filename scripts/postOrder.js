(async ()=>{
  const fetch = (...args) => import('node-fetch').then(({default:fetch})=>fetch(...args));
  try{
    const res = await fetch('http://localhost:3000/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({customerName:'Test User',phone:'03000000000',address:'Test Addr',paymentMethod:'COD',items:[{name:'Sample',quantity:1,unitPrice:1000}],deliveryCharge:100})});
    console.log('status',res.status);
    const data = await res.text();
    console.log('body',data);
  }catch(e){console.error(e)}
})();
