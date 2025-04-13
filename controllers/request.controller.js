const Request = require('../models/Request');

exports.createRequest = async (req, res) => {
  try {
    const request = new Request(req.body);
    await request.save();
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getFarmerRequests = async (req, res) => {
    try {
      const { id } = req.params;
  
      const requests = await Request.find()
        .populate({
          path: 'productId',
          select: 'title description price category organic inStock farmer'
        })
        .populate({
          path: 'clientId',
          select: 'name email image'
        });
  
      const farmerRequests = requests.filter(
        (request) =>
          request.productId &&
          request.productId.farmer &&
          request.productId.farmer.toString() === id
      );
  
      // Return the entire request objects.
      res.json(farmerRequests);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  exports.updateRequestStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      if (status !== 'accepted' && status !== 'rejected') {
        return res.status(400).json({ error: 'Invalid status. Must be "accepted" or "rejected".' });
      }
  
      const updatedRequest = await Request.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
  
      if (!updatedRequest) {
        return res.status(404).json({ error: 'Request not found' });
      }
  
      res.json(updatedRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  