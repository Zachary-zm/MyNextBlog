// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }

import * as proxy from '../../server/proxy/index';
import { IResp } from '../../types';

const handler = async (_req, res) => {
  let resp: IResp;
  try{
    const categories = await proxy.getCategories();
    resp = {
      status: 200,
      data: categories
    }
    return res.status(200).send(resp);
  }catch (error) {
    resp = {
      status: 400,
      message: error.message
    };
    return res.status(500).send(resp);
  }
};

export default handler;