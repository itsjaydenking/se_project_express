import ClothingItem from "../models/clothingItem.js";

export const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => {
      res.send(clothingItems);
    })
    .catch((err) => {
      next(err);
    });
};

// export const createClothingItem = (req, res, next) => {
//   ClothingItem.create({
//     name: req.body.name,
//     weather: req.body.weather,
//     imageUrl: req.body.imageUrl,
//     owner: req.user._id,
//   })
//     .then((clothingItem) => {
//       res.send(clothingItem);
//     })
//     .catch((err) => {
//       next(err);
//     });
// };

export const createClothingItem = (req, res) => {
  console.log(req.user._id);
};

export const deleteClothingItem = (req, res, next) => {
  ClothingItem.findByIdAndDelete(req.params.id)
    .then((clothingItem) => {
      res.send(clothingItem);
    })
    .catch((err) => {
      next(err);
    });
};
