module.exports = (model) => {
    return {
        findAll: () => model.find({}).populate(),
        findOne: id => model.findById(id),
        updateOne: async (id, updateData) => {
            const newEntity = new model(updateData);
            const error = newEntity.validateSync();    // a modelben lefuttatja a validate-t, true/false
            if (!error) {
                return model.findByIdAndUpdate(id, updateData, {new: true});
            } 
            throw new Error('Update | Model is not valid!')
        },
        create: (data) => {
            // return newEntity.save();
            // const newEntity = new model(data);
            
            const newEntity = new model(data);
            const error = newEntity.validateSync();
            if (!error) {
                return newEntity.save();
            } 
            throw new Error('Create | Model is not valid!')

		},
        delete: async (id) => {
			const removedEntity = await model.findByIdAndRemove(id);
			if (!removedEntity) {
				throw new Error('Not found');
			}
			return removedEntity.delete();
		}
    }
}


 