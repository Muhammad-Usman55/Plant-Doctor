const PredictionResult = ({ result }) => {
    const isHealthy = result.class.toLowerCase().includes("healthy");
    const confidencePercent = (result.confidence * 100).toFixed(2);

    const plantName = result.plant ? result.plant.replace(/_/g, ' ') : "Unknown Plant";
    const diseaseName = result.disease ? result.disease : "Unknown Disease";

    return (
        <div className="result-card glass-card">
            {result.mock && (
                <div style={{ marginBottom: '1rem', padding: '0.75rem', background: '#ff9800', borderRadius: '8px', color: '#000' }}>
                    ⚠️ <strong>Demo Mode:</strong> TensorFlow not installed. Install it for real predictions.
                </div>
            )}
            <h2>Analysis Result</h2>

            <div className="result-details">
                <div className="detail-item">
                    <span className="label">Plant Category</span>
                    <h3 className="value">{plantName}</h3>
                </div>

                <div className="detail-item">
                    <span className="label">Condition</span>
                    <h3 className={`health-status ${isHealthy ? 'healthy' : 'disease'}`}>
                        {diseaseName}
                    </h3>
                </div>
            </div>

            <div className="confidence-meter">
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Confidence Score</p>
                <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{confidencePercent}%</p>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px' }}>
                <p style={{ margin: 0 }}>
                    {isHealthy
                        ? "✨ Great news! Your plant looks healthy."
                        : "⚠️ Issues detected. Monitor your plant closely."}
                </p>
            </div>
        </div>
    );
};

export default PredictionResult;
