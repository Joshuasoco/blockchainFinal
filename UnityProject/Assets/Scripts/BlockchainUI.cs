using System.Numerics;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

/// <summary>
/// Simple debug UI that lets you test read/write operations on the
/// SimpleStorage contract directly from the Unity Game view.
///
/// SCENE SETUP (all under a Canvas):
///   - TMP_InputField  "NumberInput"
///   - TMP_InputField  "MessageInput"
///   - Button          "SetNumberBtn"
///   - Button          "SetMessageBtn"
///   - Button          "ReadBtn"
///   - TextMeshProUGUI "StatusText"
///
/// Drag each UI element into the matching slot in the Inspector.
/// </summary>
public class BlockchainUI : MonoBehaviour
{
    [Header("Input Fields")]
    [SerializeField] private TMP_InputField numberInput;
    [SerializeField] private TMP_InputField messageInput;

    [Header("Buttons")]
    [SerializeField] private Button setNumberBtn;
    [SerializeField] private Button setMessageBtn;
    [SerializeField] private Button readBtn;

    [Header("Output")]
    [SerializeField] private TextMeshProUGUI statusText;

    private BlockchainInteraction _blockchain;

    // ---------- Unity lifecycle ----------
    private void Start()
    {
        _blockchain = FindObjectOfType<BlockchainInteraction>();
        if (_blockchain == null)
        {
            Log("ERROR: BlockchainInteraction not found in the scene.");
            return;
        }

        setNumberBtn.onClick.AddListener(OnSetNumber);
        setMessageBtn.onClick.AddListener(OnSetMessage);
        readBtn.onClick.AddListener(OnRead);

        Log("UI ready. Blockchain connected: " + _blockchain.IsConnected);
    }

    // ---------- Button handlers ----------
    private async void OnSetNumber()
    {
        if (!BigInteger.TryParse(numberInput.text, out BigInteger num))
        {
            Log("Please enter a valid integer.");
            return;
        }
        Log($"Sending setNumber({num})...");
        string txHash = await _blockchain.WriteNumber(num);
        Log(txHash != null
            ? $"setNumber TX: {txHash}"
            : "setNumber FAILED — check Console.");
    }

    private async void OnSetMessage()
    {
        string msg = messageInput.text;
        if (string.IsNullOrWhiteSpace(msg))
        {
            Log("Please enter a message.");
            return;
        }
        Log($"Sending setMessage(\"{msg}\")...");
        string txHash = await _blockchain.WriteMessage(msg);
        Log(txHash != null
            ? $"setMessage TX: {txHash}"
            : "setMessage FAILED — check Console.");
    }

    private async void OnRead()
    {
        Log("Reading from blockchain...");
        BigInteger num = await _blockchain.ReadNumber();
        string     msg = await _blockchain.ReadMessage();
        Log($"Number: {num}\nMessage: {msg}");
    }

    // ---------- Helpers ----------
    private void Log(string text)
    {
        Debug.Log($"[BlockchainUI] {text}");
        if (statusText != null) statusText.text = text;
    }
}
