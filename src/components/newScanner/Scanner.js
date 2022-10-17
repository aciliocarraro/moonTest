import React, { useState, useEffect, useRef } from "react";
import Quagga from "quagga";
import "./Scanner.css";

const Scanner = (props) => {
  const firstUpdate = useRef(true);
  const [isStart, setIsStart] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [prodName, setProdName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const prodNameHandler = (e) => {

    setProdName(e.target.value);

  }
  const formHandler = (e) => {
    e.preventDefault();
    if (prodName.trim().length === 0) {
      return;
    }
    console.log(prodName);
    props.onAddBarCode(barcode, prodName);
    setProdName("");
    setShowForm(false)
    setBarcode('')
  };

  useEffect(() => {
    return () => {
      if (isStart) stopScanner();
    };
  }, [isStart]);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (isStart) startScanner();
    else stopScanner();
  }, [isStart]);

  const _onDetected = (res) => {
    setBarcode(res.codeResult.code);
    setProdName("Product" + Math.floor(Math.random() * 1000))
    // props.onAddBarCode({
    //   id: Math.random().toString(),
    //   barcode: res.codeResult.code,
    //   product_name: prodName
    // });
    console.log(res.codeResult.code);
    // stopScanner();
    setIsStart(false);
    setShowForm(true);
  };
  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            facingMode: "environment", // or user
          },
        },
        numOfWorkers: navigator.hardwareConcurrency,
        locate: true,
        frequency: 1,
        debug: {
          drawBoundingBox: false,
          showFrequency: true,
          drawScanline: true,
          showPattern: true,
        },
        multiple: false,
        locator: {
          halfSample: false,
          patchSize: "large", // x-small, small, medium, large, x-large
          debug: {
            showCanvas: false,
            showPatches: false,
            showFoundPatches: false,
            showSkeleton: false,
            showLabels: false,
            showPatchLabels: false,
            showRemainingPatchLabels: false,
            boxFromPatches: {
              showTransformed: false,
              showTransformedBox: false,
              showBB: false,
            },
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader",
            "i2of5_reader",
            "2of5_reader",
            "code_93_reader",
          ],
        },
      },
      (err) => {
        if (err) {
          return console.log(err);
        }
        Quagga.start();
      }
    );
    Quagga.onDetected(_onDetected);
  };
  const stopScanner = () => {
    Quagga.offProcessed();
    Quagga.offDetected();
    Quagga.stop();
  };

  return (
    <div className="container">
      <div className="form-container">
        {(!showForm &&
          <div className="dummy-scanner-cont">
            <div className="dummy-scanner">
              <img src="/img/barcode-scan.jpg" alt="barcode" />
            </div>
          </div>

        )}
        {(showForm && <form onSubmit={formHandler}>
          <legend>Product Name</legend>
          <div>
            <input
              id="prodName"
              className="form-control"
              type="text"
              onChange={prodNameHandler}
              value={prodName}
            />
          </div>
          <div className="btn-wrapper">
            <button className="btn btn-dark btn-75 my-3 py-2 fs-4" type="submit">
              Save product name
            </button>
          </div>

        </form>
        )}
      </div>
      {barcode && <div className="m-auto text-center fs-4">Barcode Scanned: {barcode} </div>}
      <button
        className={`btn btn-75 py-2 fs-3 fw-bold d-block m-auto mt-3 ${isStart ? "btn-danger" : "btn-success"}`}
        onClick={() => setIsStart((prevStart) => !prevStart)}
        style={{ marginBottom: 20 }}
      >
        {isStart ? "Stop" : "Start"}
      </button>
      {isStart && (
        <div className="video__container">
          <div id="scanner-container" />
        </div>
      )}
    </div>
  );
};

export default Scanner;
