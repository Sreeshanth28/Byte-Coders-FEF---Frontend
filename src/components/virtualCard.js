import React from 'react';
import '../styles/virtualCard.css';

const VirtualCard = ({ cardDetails, onClose }) => {
    return (
        <div className="virtualCard-modal-overlay" onClick={onClose}>
            <div className="virtualCard-modal-content" onClick={e => e.stopPropagation()}>
                <button className="virtualCard-close-button" onClick={onClose}>&times;</button>
                <div className="virtualCard-container">
                    <div className="virtualCard-card">
                        <div className="virtualCard-cardInner">
                            <div className="virtualCard-front">
                                <img src="https://i.ibb.co/PYss3yv/map.png" className="virtualCard-mapImg" alt="Map" />
                                <div className="virtualCard-row">
                                    <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="60px" alt="Chip" />
                                    <img src="https://i.ibb.co/dcCbkPz/3b714d-b1da88153bef422e9e9bace006a9fa8e-removebg-preview.png" width="80px" alt="Visa" />
                                </div>
                                <div className="virtualCard-row virtualCard-cardNo">
                                    <p>{cardDetails.number.slice(0,4)}</p>
                                    <p>{cardDetails.number.slice(4,9)}</p>
                                    <p>{cardDetails.number.slice(9,14)}</p>
                                    <p>{cardDetails.number.slice(14,19)}</p>
                                </div>
                                <div className="virtualCard-row virtualCard-cardHolder">
                                <p>{cardDetails.name}</p>
                                <p>{cardDetails.expiry}</p>
                                </div>
                                <div className="virtualCard-row virtualCard-name">
                                    <p>{cardDetails.name}</p>
                                    <p>{cardDetails.expiry}</p>
                                </div>
                            </div>
                            <div className="virtualCard-back">
                                <img src="https://i.ibb.co/PYss3yv/map.png" className="virtualCard-mapImg" alt="Map" />
                                <div className="virtualCard-bar"></div>
                                <div className="virtualCard-row virtualCard-cardCvv">
                                    <div>
                                        <img src="https://i.ibb.co/S6JG8px/pattern.png" alt="Pattern" />
                                    </div>
                                    <p>{cardDetails.cvv}</p>
                                </div>
                                <div className="virtualCard-row virtualCard-cardText">
                                    <p>This is a virtual card design using HTML and CSS. You can also design something like this.</p>
                                </div>
                                <div className="virtualCard-row virtualCard-signature">
                                    <p>CUSTOMER SIGNATURE</p>
                                    <img src="https://i.ibb.co/dcCbkPz/3b714d-b1da88153bef422e9e9bace006a9fa8e-removebg-preview.png" width="80px" alt="Visa" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualCard;