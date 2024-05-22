export const productValidator = (req, res, next) => {
    const { title, description, code, price, stock, status, category, thumbnail } = req.body;
  
    // console.log(req.body); 
  
    if (
      !title || 
      !description || 
      !code || 
      typeof price !== 'number' || 
      typeof stock !== 'number' || 
      typeof status !== 'boolean' || 
      !category || 
      !Array.isArray(thumbnail)
    ) {
      return res.status(400).json({ msg: "Invalid body" });
    }
    next();
  };
  