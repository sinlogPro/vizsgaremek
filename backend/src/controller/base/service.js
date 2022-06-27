module.exports = (model, populateList = []) => {
    return {
        // findAll: () => model.find({}),
        findAll: (params = {}) => {
            if (Object.keys(params).length) {
                Object.keys(params).map( key => {
                    params[key] = { 
                        $regex: '.*' + params[key] + '.*', 
                        $options: 'i' 
                    };
                });
                // console.log('paraméter:', params);
                // console.log('populateList:', populateList);
                return model.find(params).populate([...populateList]).select("-__v");
            }
            return model.find(params).populate([...populateList]).select("-__v");
        },


        // {"_id":"62b42234e7a3ef250ac7a65a","name":"Turcotte and Sons","email":"acornbelli@nytimes.com","phoneNumber":"+62 (739) 461-7855","url":"https://loc.gov","address":{"_id":"62b42275c0499709e35c79a5","country":"China","zipcode":3425,"city":"Jiangchengt","state":"Cane","streetName":"Colorado","streetNumber":"652","__v":0},"createdAt":"2022-06-23T08:20:05.008Z","updatedAt":"2022-06-25T06:21:24.611Z"}
        // {"_id":"62b42234e7a3ef250ac7a65a","name":"Turcotte and Sons","email":"acornbelli@nytimes.com","phoneNumber":"+62 (739) 461-7855","url":"https://loc.gov","address":{"_id":"62b42275c0499709e35c79a5","country":"China","zipcode":3425,"city":"Jiangchengt","state":"Cane","streetName":"Colorado","streetNumber":"652","__v":0},"__v":0,"createdAt":"2022-06-23T08:20:05.008Z","updatedAt":"2022-06-25T06:21:24.611Z"}

        // findOne: id => model.findById(id),
        
        // findOne: (id) => model.findById(id).populate([...populateList]).select("-__v"),
        // findOne: (id) => model.findById(id).populate(...populateList),
        findOne: (id) => model.findById(id).populate([...populateList]),

        updateOne: async (id, updateData) => {
            // console.log('itt vagyunk');
            const newEntity = new model(updateData);
            // console.log(newEntity);
            const error = newEntity.validateSync();    // a modelben lefuttatja a validate-t, true/false
            // console.log(error);
            // if (error) console.log('Validációs hiba');
            if (!error) {
                // console.log('NINCS Validációs hiba');                
                // return model.findByIdAndUpdate(id, updateData, {new: true, runValidators: false });
                return model.findByIdAndUpdate(id, updateData, {new: true});
            } 
            throw new Error('Update | Model is not valid!')
        },
        create: async (data) => {
            // return newEntity.save();
            // const newEntity = new model(data);
            
            const newEntity = new model(data);
            const error = newEntity.validateSync();
            if (!error) {
                // return newEntity.save();
                const saved = await newEntity.save();
                return model.findById(saved._id);
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


 