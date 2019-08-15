const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();


router.get('/', (req, res) => {
  Schemes.find()
    .then(scheme => {
        res.json(scheme);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get schemes' });
    });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
        res.status(200).json(scheme);
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get schemes' });
    })
});


router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
    .then(scheme => {
      res.status(200).json(scheme)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get steps' });
    })
});


router.post('/', (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
    .then(newScheme => {
      res.status(201).json(newScheme);
    })  
    .catch(err => {
      res.status(500).json({ message: 'Failed to create new scheme' });
    })
});


router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    const scheme = await Schemes.findById(id);

    if (scheme) {
      const updatedScheme = await Schemes.update(changes, id);
      res.json(updatedScheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to update scheme' });
  }
});
//how to update to resolved obj?


router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
    .then(deletedScheme => {
      res.json(deletedScheme)
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete scheme' });
    })
});

module.exports = router;




// router.post('/:id/steps', (req, res) => {
//   const stepData = req.body;
//   const { id } = req.params; 

//   Schemes.findById(id)
//   .then(scheme => {
//     if (scheme) {
//       Schemes.addStep(stepData, id);
//       res.status(201).json(step);
//     } else {
//       res.status(404).json({ message: 'Could not find scheme with given id.' })
//     }
//   })
//   .catch(err => {
//     res.status(500).json({ message: 'Failed to create new step' });
//   })
// });