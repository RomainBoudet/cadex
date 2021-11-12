
const cadexController = {


    getCadex: (req, res) => {

        console.log('hello world');
        res.status(200).json({message: "Hello World"});
    }

}

module.exports = cadexController;