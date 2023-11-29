import React, { useState, useEffect } from "react";
// import axios from 'axios';

const CardsComponent = () => {
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({ title: "", description: "" });
  const [removeIndex, setRemoveIndex] = useState("");

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get('/api/cards'); // Replace with your server endpoint
  //         setCards(response.data);
  //       } catch (error) {
  //         console.error('Error fetching cards:', error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  const handleAddCard = async (e) => {
    e.preventDefault();

    // try {
    //   await axios.post('/api/add_card', newCard); // Replace with your server endpoint
    //   const response = await axios.get('/api/cards'); // Replace with your server endpoint
    //   setCards(response.data);
    //   setNewCard({ title: '', description: '' });
    // } catch (error) {
    //   console.error('Error adding card:', error);
    // }
  };

  const handleRemoveCard = async (e) => {
    e.preventDefault();

    // try {
    //   await axios.post('/api/remove_card', { removeIndex }); // Replace with your server endpoint
    //   const response = await axios.get('/api/cards'); // Replace with your server endpoint
    //   setCards(response.data);
    //   setRemoveIndex('');
    // } catch (error) {
    //   console.error('Error removing card:', error);
    // }
  };

  return (
    <div>
      <div className="row">
        {cards.map((card) => (
          <div className="col-md-6 mb-3" key={card.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{card.card_title}</h5>
                <p className="card-text">{card.card_desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleAddCard}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Card Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={newCard.title}
                  onChange={(e) =>
                    setNewCard({ ...newCard, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Card Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  name="description"
                  value={newCard.description}
                  onChange={(e) =>
                    setNewCard({ ...newCard, description: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Add Card
              </button>
            </form>
          </div>

          <div className="col-md-4">
            <form onSubmit={handleRemoveCard}>
              <div className="mb-3">
                <label htmlFor="removeIndex" className="form-label">
                  Remove Card (by index)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="removeIndex"
                  name="removeIndex"
                  value={removeIndex}
                  onChange={(e) => setRemoveIndex(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger">
                Remove Card
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsComponent;
