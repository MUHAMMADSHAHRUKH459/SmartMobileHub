const { PrismaClient } = require('@prisma/client');
(async ()=>{
  const p = new PrismaClient();
  console.log('client keys:', Object.keys(p).sort());
  try{ await p.$disconnect(); }catch(e){}
})();
